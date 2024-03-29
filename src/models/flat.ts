export interface Flat {
  uuid: string;
  title: string;
  description: any;
  headline: any;
  createdAt: string;
  updatedAt: string;
  metroTime: any;
  metroTimeType: any;
  price: number;
  priceCurrency: number;
  pricePerM2: number;
  pricePerM2Max: number;
  pricePerPerson: number;
  priceMin: number;
  priceMax: number;
  priceChangeDirection: number;
  priceChangeDate: string;
  storeys: number;
  storey: number;
  rooms: number;
  contactPhones: object;
  images: object;
  areaTotal: number;
  areaLiving: number;
  areaKitchen: number;
  areaMax: any;
  areaMin: any;
  areaLand: any;
  objectType: any;
  code: number;
  stateRegionName: string;
  stateDistrictName: string;
  townType: number;
  townName: string;
  streetName: string;
  address: string;
  contactName: string;
  agencyName: string;
  metroStationName: any;
  metroLineId: any;
  houseNumber: any;
  buildingNumber: any;
  paymentStatus: number;
  comments: string;
  isFavorite: boolean;
  category: number;
  has3dTour: boolean;
  hasVideo: boolean;
  stateRegionUuid: string;
  numberOfBeds: any;
  directionName: any;
  townDistance: any;
  customSorting: number;
  specialComment: string;
  userUuid: string;
  agencyUuid: string;
  location: object;
  townUuid: string;
  buildingYear: number;
  __typename: string;
  priceRates: object;
  priceRatesPerM2: object;
  priceRatesPerM2Max: any;
  priceRatesPerPerson: any;
  priceRatesMin: any;
  priceRatesMax: any
}
