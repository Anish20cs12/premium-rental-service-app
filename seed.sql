INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-1', 'car', 'Ferrari 488 GTB', 1200, ARRAY['https://th.bing.com/th/id/OIP.XdSw_9HITsIJ8pV0dON5PgHaE8?w=265&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1'], '{"Engine":"3.9L V8","Seats":2}'::jsonb, 4.9, 'Dubai Marina')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-2', 'car', 'Lamborghini Huracán', 1100, ARRAY['https://th.bing.com/th/id/OIP.hIK3PmQMOJMJfg9j_dIvoQHaE8?w=279&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1'], '{"Engine":"5.2L V10","Seats":2}'::jsonb, 4.8, 'Abu Dhabi')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-3', 'car', 'Porsche 911 Carrera', 800, ARRAY['https://th.bing.com/th/id/OIP.DF9hw86bwI9yhcVuB5tsegHaEK?w=335&h=187&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1'], '{"Engine":"3.0L H6","Seats":4}'::jsonb, 4.7, 'Monaco')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-4', 'car', 'BMW M4 Competition', 650, ARRAY['https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], '{"Engine":"3.0L I6","Seats":4}'::jsonb, 4.6, 'Berlin')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-5', 'car', 'Audi R8', 900, ARRAY['https://images.unsplash.com/photo-1616617535619-55e3db07bd5b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVkaSUyMHI4fGVufDB8fDB8fHww'], '{"Engine":"5.2L V10","Seats":2}'::jsonb, 4.7, 'Paris')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-6', 'car', 'McLaren 720S', 1300, ARRAY['https://images.unsplash.com/photo-1647535884306-f7bc3c357b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWMlMjBsYXJlbnxlbnwwfHwwfHx8MA%3D%3D'], '{"Engine":"4.0L V8","Seats":2}'::jsonb, 4.9, 'London')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-7', 'car', 'Mercedes-AMG GT', 950, ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop'], '{"Engine":"4.0L V8","Seats":2}'::jsonb, 4.6, 'New York')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-8', 'car', 'Aston Martin DB11', 1000, ARRAY['https://images.unsplash.com/photo-1754597047047-f6f173116fab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFzdG9uJTIwbWFydGluJTIwZEIxMXxlbnwwfHwwfHx8MA%3D%3D'], '{"Engine":"5.2L V12","Seats":4}'::jsonb, 4.7, 'Los Angeles')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-9', 'car', 'Tesla Model S Plaid', 700, ARRAY['https://images.unsplash.com/photo-1727995319823-2887b920c011?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlc2xhJTIwbW9kZWwlMjBzJTIwcGxhaWR8ZW58MHx8MHx8fDA%3D'], '{"0-60mph":"1.99s","Seats":5}'::jsonb, 4.8, 'San Francisco')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('car-10', 'car', 'Chevrolet Corvette C8', 600, ARRAY['https://images.unsplash.com/photo-1672151576478-a4ca761424ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoZXZyb2xldCUyMGNvcnZldHRlJTIwYzh8ZW58MHx8MHx8fDA%3D'], '{"Engine":"6.2L V8","Seats":2}'::jsonb, 4.5, 'Miami')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('bike-1', 'bike', 'Ducati Panigale V4', 450, ARRAY['https://th.bing.com/th/id/OIP.Z46MNgToYB54jp5MoGCZCQHaEK?w=313&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1'], '{"Capacity":"1103cc","Power":"214 hp"}'::jsonb, 4.8, 'Monaco')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('bike-2', 'bike', 'Kawasaki Ninja H2', 400, ARRAY['data:image/webp;base64,UklGRgQ0AABXRUJQVlA4IPgzAACw4QCdASqLAeoAPp1Emkolo6IpKheMMSATiWNrt+M785L1OwByzv2OEiEcBqg/mbDTdsrL72C40P/D/7Hy2vj+9V6XPLF8+XrD51p8U8Xtlbpp+bbgGH/4b/K8z/uTknZYvLXUL9m/8P1AftvA12f/mehB7tfePRRnDfR37X2AuDY9d9gX9aer//teUv9e/4XsK9NL0oTueGxfHMFIWyTD5XYH0DuDQSbSHdvgZoux7Ce8PLlDcI7VLG2758l7Th5C5KRl+qNsBIYOnVZkGOUcJvPc5r3hzltiKqKALqKDSWYXYe/ov6DgmUeXR7g1SgthL8TeDzUJpgw7NNm17AdTVYVz6hxBIa8whEnpzXXIGl2/qIPwduCzmYUkLSSQ6l0BcIDOq8+iBXuxR1IGp88RMEQYJ8UTVpXs4Jj+q4x/hsU3TU0XgJRf7Wbt8bhb4czqdGAIFTZBS58e9qkyDysl1IjemZbkaVKEKMaykBDsBCJNwk8YPijWFd2vaRyVmemGia28Pfn3UGO84CyvVCyXqO3b4cbt78YR7gigVfe5NJZfTOQWV+0xX3Bq0KmgKIpAQg7/3UAR4P28iuMw083OVEmB9E9WD8by8yfgwLCGCqNfTIzgyTRv4ymyj6syBuhJ6pMkbexBTVxOtMsGuB3YaD6wxDbeSffQzcWeqfutmsu27LRbYwD4AngL0C7+Mg8y41fz9OmDoTmdVxcun9zYQgT5wCysLcTySKkLWN6fB8G8BUswYfgDLqLL3FQwbIhAAOhVSOeN32ZLjDT7vNlLUnrcMlbIuVbalpuz2ZhPqCmRox40wf2/jDwKCvD3tODLGRoQkDYukRVNTX2ygjqS1WDnEVnqzhBHByDURb8q1X3x9BCQI+hkTCQI+IFSYQzybae8LXkqMUOo5pnXoRSfe2uEuqy/KTREQpnK4oBlzwYf9OTbMqten5n082I8qZhOQLo4P58T91E1dNsndSuRqKVofH9zepg1H/RNx/KxWtZLptGbQQEpZsdoeHcuiKndcSFQWlr3JuSI/zibF1QXHim7K7OTJFxjH0sSBh28PvYd+zjc2+YqXJlfEApjqsQfNKrm1qg/21+0Wzn+xwvP5E++nl7ypKteM8o/XedSRJ3wR9Rxb9y6hNW7GXbnOKuTEWF6uXM/xYv3+wk8HSthow77dzue1j98auHVwZu/1VXaD8k05Rzst2yeEZCEVSGkVkhT1MW7nBmu7AHfflj/IVIn1vqQJQsgXNW4zpb4sX8FrrexhcZevnJyIbwwNATNyg2nBpLicTV3eEBbUoW+9yPvB6HT2/5AtVHcO/9GpFZ+Ppuy5TCNoejTQbo/fcOR1RzmJVhjoKPu3pIBV1RUQh6zpnb6axplzN6s5luhuYKWfsh2OkX49TPXGkZJGyAx26JtlWzEiiM/OopX0JKqQh1VYIThot3WTdhA3WzSxb+0UsPGEjxptRqAKlk2Zet7EwrB4HPoKahwqkK8AsHV6N523bymgxq8ILhddPifjZKpVwNBbKJwnj9SREj9kZ1yhw0pHuHVDimwmE6Yx4nJtJ2b6wvzYM6t5rrR+rHvlKFiPvBiVD+rwQrJ7asKw6XPCQ4DaExjOCLhZU7ANdarhb/g5xrmvk4hw/pM+vJw+xdYNS931Zxjcwg0Oob+WWIpwSViv1a6kWDrtkhFOZKpyYVPxakIoRKGldd8jr0gUsZ4tNoYNM/wyl+6VAvZdON5sOwFpBmr0wMjHBBgDOjtvk23LmFb4lF4H47PZLf/yRBlyuJPginX8Wv725rMFeuB7ZZ/SdOm18DzKa5bibz5msfk2HVsHt6O5GZDz829X/3Tl/hPuITOir2y1kmwL95'], '{"Capacity":"1868cc","Power":"94 hp"}'::jsonb, 4.7, 'Chicago')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-1', 'room', 'Oceanview Luxury Suite', 800, ARRAY['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'], '{"View":"Sea","Size":"120 m²","Beds":2}'::jsonb, 4.7, 'Goa')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-2', 'room', 'Sujanpur Hill Retreat', 700, ARRAY['https://images.unsplash.com/photo-1616594341710-1e8b9e3e7b48?q=80&w=1200&auto=format&fit=crop'], '{"View":"Mountain","Size":"100 m²","Beds":1}'::jsonb, 4.6, 'Sujanpur')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-3', 'room', 'Hamirpur City Suite', 1200, ARRAY['https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'], '{"View":"City","Size":"180 m²","Beds":2}'::jsonb, 4.8, 'Hamirpur')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-4', 'room', 'Kangra Valley Villa', 900, ARRAY['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop'], '{"View":"Valley","Size":"140 m²","Beds":2}'::jsonb, 4.6, 'Kangra')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-5', 'room', 'Goa Forest Cabin', 500, ARRAY['https://images.unsplash.com/photo-1505692794403-34dc5d1bcacc?q=80&w=1200&auto=format&fit=crop'], '{"View":"Forest","Size":"80 m²","Beds":1}'::jsonb, 4.4, 'Goa')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-6', 'room', 'Beas River Lodge', 650, ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop'], '{"View":"River","Size":"110 m²","Beds":2}'::jsonb, 4.5, 'Sujanpur')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-7', 'room', 'Hamirpur Garden Bungalow', 550, ARRAY['https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'], '{"View":"Garden","Size":"90 m²","Beds":1}'::jsonb, 4.5, 'Hamirpur')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-8', 'room', 'Kangra Fort Suite', 1000, ARRAY['https://images.unsplash.com/photo-1491557345352-7c3e85ee9b44?q=80&w=1200&auto=format&fit=crop'], '{"View":"Fort","Size":"160 m²","Beds":2}'::jsonb, 4.7, 'Kangra')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-9', 'room', 'Goa Zen Villa', 750, ARRAY['https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'], '{"View":"Garden","Size":"100 m²","Beds":1}'::jsonb, 4.6, 'Goa')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;

INSERT INTO public.items (id, category, title, price_per_day, images, specs, rating, location)
VALUES ('room-10', 'room', 'Goa Infinity Suite', 1100, ARRAY['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'], '{"View":"Cliffside","Size":"150 m²","Beds":2}'::jsonb, 4.8, 'Goa')
ON CONFLICT (id) DO UPDATE SET
category = EXCLUDED.category,
title = EXCLUDED.title,
price_per_day = EXCLUDED.price_per_day,
images = EXCLUDED.images,
specs = EXCLUDED.specs,
rating = EXCLUDED.rating,
location = EXCLUDED.location;