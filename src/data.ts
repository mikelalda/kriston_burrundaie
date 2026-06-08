/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Band, Shift } from './types';

export const FESTIVAL_DATE = '2026ko Irailaren 19a';
export const FESTIVAL_LOCATION = 'Azpeitiko kaleetan zehar';

export const INITIAL_BANDS: Band[] = [
  {
    id: '1',
    name: 'ZIKIN',
    style: 'D-Beat / Hardcore Punk herritarra',
    desc: 'Gure lohian blai, asfalto gaineko zarata gupidagabea. Azken diskoaren aurkezpen bira gure kaleetan hautsa harrotzeko ordua da!',
    image: 'https://picsum.photos/seed/zikinpunk/600/400',
    time: '12:00',
    location: 'Plaza Nagusian',
    bandcamp: 'https://bandcamp.com',
    instagram: 'https://instagram.com'
  },
  {
    id: '2',
    name: 'ODOL BERRI',
    style: 'Hardcore punk melodiko gaztea',
    desc: 'Lekuko aldaketa prest dago. Herriko gazteen amorru eraikitzailea eta melodia biziak uztartzen dituen proiektu fresko eta gogorra.',
    image: 'https://picsum.photos/seed/odolberri/600/400',
    time: '14:30',
    location: 'Kultur Etxeko Eskaileretan',
    bandcamp: 'https://bandcamp.com',
    instagram: 'https://instagram.com'
  },
  {
    id: '3',
    name: 'KALE ARTEAN',
    style: 'Oi! / Street Punk herrikoia',
    desc: 'Langile klasearen oihua eta herri erresistentzia lau haizetara. Melodia itsaskorrak, koro indartsuak eta ukabilak goian kale kantoietan!',
    image: 'https://picsum.photos/seed/kaleartean/600/400',
    time: '17:00',
    location: 'Gaztetxeko Atarian',
    bandcamp: 'https://bandcamp.com',
    instagram: 'https://instagram.com'
  },
  {
    id: '4',
    name: 'BURRUNDA',
    style: 'Crust Punk / Metal astuna',
    desc: 'Iluntasuna eta amorrua uztartzen dituen doinu trinko eta gupidagabeak. Gure gizarte mekanizatu eta grisaren zartatze hotsa.',
    image: 'https://picsum.photos/seed/burrundapunk/600/400',
    time: '19:30',
    location: 'Plazuela Gorrian',
    bandcamp: 'https://bandcamp.com',
    instagram: 'https://instagram.com'
  },
  {
    id: '5',
    name: 'HAUTS',
    style: 'Post-Punk / Coldwave iluna',
    desc: 'Doinu hipnotiko eta malenkoniatsuak mezu sutsu eta zuzenekin. Hiriko eta herriko kale ilunek behar duten argi krispatsua eta gailurra.',
    image: 'https://picsum.photos/seed/hautsband/600/400',
    time: '21:30',
    location: 'Kale Nagusian (Soinu-argi muntaia berezia)',
    bandcamp: 'https://bandcamp.com',
    instagram: 'https://instagram.com'
  },
  {
    id: '6',
    name: 'KALEKO ZARATA',
    style: 'DJ Kolektibo Autogestionatua',
    desc: 'Egun osoko zaratari amaiera bikaina emateko binilo sesio hautatua. Punk, Oi!, SKA, eta herri dantza basatiak argiak itzali arte.',
    image: 'https://picsum.photos/seed/kalekozarata/600/400',
    time: '23:30',
    location: 'Txosnagune Nagusian',
    bandcamp: 'https://bandcamp.com',
    instagram: 'https://instagram.com'
  }
];

export const INITIAL_SHIFTS: Shift[] = [
  // Muntaia
  { id: 'm1', time: '09:00 - 11:30', role: 'Muntaia', needed: 4, volunteers: ['Mikel Alda', 'Aitor Ruiz'] },
  { id: 'm2', time: '11:30 - 14:00', role: 'Muntaia', needed: 4, volunteers: ['Ane Agirre'] },
  // Txosna
  { id: 't1', time: '12:00 - 15:00', role: 'Txosna', needed: 5, volunteers: ['Jon', 'Nerea Elkarte'] },
  { id: 't2', time: '15:00 - 18:00', role: 'Txosna', needed: 5, volunteers: ['Uxue', 'Miren'] },
  { id: 't3', time: '18:00 - 21:00', role: 'Txosna', needed: 6, volunteers: ['Gorka', 'Lander', 'Oihana'] },
  { id: 't4', time: '21:00 - 00:00', role: 'Txosna', needed: 6, volunteers: ['Sabin Urko', 'Amaia Gorri'] },
  { id: 't5', time: '00:00 - 03:00', role: 'Txosna', needed: 6, volunteers: [] },
  // Soinua & Argiak
  { id: 's1', time: '11:00 - 15:30', role: 'Soinua & Argiak', needed: 2, volunteers: ['Julen Sound'] },
  { id: 's2', time: '15:30 - 20:00', role: 'Soinua & Argiak', needed: 2, volunteers: ['Eneko'] },
  { id: 's3', time: '20:00 - 01:00', role: 'Soinua & Argiak', needed: 3, volunteers: ['Iker Argiak'] },
  // Garbiketa
  { id: 'g1', time: '14:30 - 17:00', role: 'Garbiketa', needed: 3, volunteers: ['Koldo'] },
  { id: 'g2', time: '19:30 - 22:00', role: 'Garbiketa', needed: 3, volunteers: [] },
  { id: 'g3', time: '01:00 - 03:00', role: 'Garbiketa', needed: 5, volunteers: [] },
  // Desmuntaia
  { id: 'd1', time: '01:00 - 03:00', role: 'Desmuntaia', needed: 6, volunteers: ['Enetz', 'Tasio'] }
];
