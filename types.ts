
export enum Condition {
  New = 'Seminuevo',
  Excellent = 'Excelente',
  Good = 'Bueno',
  Used = 'Usado'
}

export enum PriceOption {
  USD = 'usd',
  CASH = 'cash',
}

export interface Product {
  id: string;
  name: string;
  usdPrice: number;
  listPriceArs: number;
  discountPriceArs: number;
  capacity: string;
  color: string;
  condition: Condition;
  image: string;
  battery?: string;
  details?: string;
  isOffer?: boolean;
}

export interface TradeInItem {
  model: string;
  valueUsd: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}