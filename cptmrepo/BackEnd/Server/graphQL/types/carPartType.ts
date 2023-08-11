//Sola Dugbo
/**
 * Represents a car part.
 */

export interface CarPart {
  no: number; // The part number
  code: string; // The part code
  description: string; // The part description
  brand: string; // The brand of the part
  model: string; // The model the part fits onto
  oem: string; // The original equipment manufacturer (OEM) part number
  pcs: number; // The number of pieces in a part
  nw: number; // The net weight of the part
  gw: number; // The gross weight of the part
  m3: number; // The volume of the part in cubic meters
  start_year: number; // The start year of compatibility
  end_year: number; // The end year of compatibility
  image_name: string; // The name of the image file for the part
}
