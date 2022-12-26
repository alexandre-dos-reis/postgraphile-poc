begin;

insert into public.person (id, first_name, last_name, about, created_at) values
  (1, 'Sara', 'Powell', null, '2015-07-03T14:11:30Z'),
  (2, 'Andrea', 'Fox', null, '1999-04-04T21:21:42Z'),
  (3, 'Stephen', 'Banks', null, '2003-12-09T04:39:10Z'),
  (4, 'Kathy', null, null, '2001-11-03T15:37:15Z'),
  (5, 'Kenneth', 'Williams', null, '2002-08-16T19:03:47Z'),
  (6, 'Ann', 'Peterson', null, '2013-09-24T15:05:29Z'),
  (7, 'Gloria', 'Lee', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', '2007-04-23T12:56:09Z'),
  (8, 'Douglas', null, null, '2008-07-10T21:49:16Z'),
  (9, 'Jeffrey', 'Palmer', null, '2000-07-28T22:33:20Z'),
  (10, 'Robert', 'Fisher', 'Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '2000-06-12T09:11:56Z');


commit;