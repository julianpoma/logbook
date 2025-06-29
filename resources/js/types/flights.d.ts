import { Aircraft } from './aircrafts';
import { User } from './auth';

export interface Flight {
  id: number;
  user_id: number;
  aircraft_id: number;
  date: string;
  departure_airport: string;
  arrival_airport: string;
  time_total: number;
  time_pic: number | null;
  time_sic: number | null;
  time_xc: number | null;
  time_night: number | null;
  time_solo: number | null;
  time_dual_received: number | null;
  time_actual_instrument: number | null;
  time_simulated_instrument: number | null;
  landings_day: number;
  landings_night: number;
  remarks: string | null;
  created_at: string;
  updated_at: string;
  user?: User;
  aircraft?: Aircraft;
}
