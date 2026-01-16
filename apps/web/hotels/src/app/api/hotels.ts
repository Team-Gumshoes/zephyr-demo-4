// import apiClient from '@/lib/api-client';

export interface HotelSearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export async function searchHotels(params: HotelSearchParams) {
  const response = {data: []} // await apiClient.post('/hotels/search', params);
  return response.data;
}

export async function getHotelDetails(hotelId: string) {
  const response = {data: []} // await apiClient.get(`/hotels/${hotelId}`);
  return response.data;
}

export async function bookHotel(hotelId: string, bookingDetails: any) {
  const response = {data: []} // await apiClient.post(`/hotels/${hotelId}/book`, bookingDetails);
  return response.data;
}
