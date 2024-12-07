export interface ProductAddRequest {
  name: string;
  price: number;
  amount: number;
  images?: FileList;
}
