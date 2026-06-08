/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Band {
  id: string;
  name: string;
  style: string;
  desc: string;
  image: string;
  time: string;
  location: string;
  bandcamp: string;
  instagram: string;
}

export type ShiftRole = 'Txosna' | 'Garbiketa' | 'Muntaia' | 'Desmuntaia' | 'Soinua & Argiak';

export interface Shift {
  id: string;
  time: string;
  role: ShiftRole;
  needed: number;
  volunteers: string[];
}
