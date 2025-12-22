-- Enable Row Level Security (RLS)
-- alter table auth.users enable row level security;

-- Create a table for public profiles (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text,
  full_name text,
  address text,
  phone text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),

  constraint username_length check (char_length(username) >= 3)
);

-- Enable RLS on profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Handle new user signup: Trigger to create a profile entry
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create items table (Cars, Bikes, Rooms)
create table items (
  id text primary key, -- keeping string IDs like 'car-1' for simplicity with current frontend, or use uuid
  category text not null check (category in ('car', 'bike', 'room')),
  title text not null,
  price_per_day numeric not null,
  images text[] not null,
  specs jsonb not null default '{}'::jsonb,
  rating numeric default 5.0,
  location text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on items
alter table items enable row level security;

create policy "Items are viewable by everyone."
  on items for select
  using ( true );

-- Create bookings table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  item_id text references items(id) not null,
  start_date date not null,
  end_date date not null,
  total_price numeric not null,
  status text default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on bookings
alter table bookings enable row level security;

create policy "Users can view their own bookings."
  on bookings for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own bookings."
  on bookings for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own bookings (e.g. cancel)."
  on bookings for update
  using ( auth.uid() = user_id );

-- Admins can view all bookings (This requires a policy checking the profile role)
create policy "Admins can view all bookings."
  on bookings for select
  using ( 
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Admins can update all bookings."
  on bookings for update
  using ( 
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- SEED DATA
insert into items (id, category, title, price_per_day, images, specs, rating, location, description) values
('car-1', 'car', 'Ferrari 488 GTB', 1200, ARRAY['/images/car-ferrari.svg'], '{"0-60mph": "3.0s", "Engine": "3.9L V8", "Seats": 2}', 4.9, 'Mumbai', 'Experience the raw power of Italian engineering.'),
('car-2', 'car', 'Lamborghini Huracán', 1100, ARRAY['/images/car-lamborghini.svg'], '{"0-60mph": "2.9s", "Engine": "5.2L V10", "Seats": 2}', 4.8, 'Hamirpur', 'Striking design with raw performance for spirited drives.'),
('bike-1', 'bike', 'Ducati Panigale V4', 450, ARRAY['/images/bike-ducati.svg'], '{"0-60mph": "3.1s", "Engine": "1103cc", "Weight": "175kg"}', 4.8, 'Bangalore', 'The closest thing to a MotoGP bike for the road.'),
('bike-2', 'bike', 'Kawasaki Ninja H2', 500, ARRAY['/images/bike-ninja-h2.svg'], '{"0-60mph": "2.5s", "Engine": "998cc SC", "Weight": "238kg"}', 4.9, 'Sujanpur', 'Supercharged engineering marvel.'),
('room-1', 'room', 'Oceanview Luxury Suite', 350, ARRAY['/images/room-ocean.svg'], '{"Size": "800 sqft", "View": "Ocean", "Bed": "King"}', 4.7, 'Goa', 'Wake up to the sound of waves in this premium suite.'),
('room-2', 'room', 'Kangra Valley Suite', 450, ARRAY['/images/room-kangra.svg'], '{"Size": "900 sqft", "View": "Valley", "Bed": "King"}', 4.9, 'Kangra', 'Panoramic views of the Dhauladhar range.');
