
import { Product, Condition, TradeInItem } from "../types";
import { PRODUCTS } from "../constants";

// Hoja de Stock (Principal)
const STOCK_SHEET_ID = "1976UdEokPzNFksRR3y1TDGjC0inR9gQByZzVYC60jXQ";
const STOCK_GID = "0";
const STOCK_URL = `https://docs.google.com/spreadsheets/d/${STOCK_SHEET_ID}/gviz/tq?tqx=out:csv&gid=${STOCK_GID}`;

// Hoja de Canje (Publicada por el usuario)
const CANJE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTkgvm8T_59wX4gE7r6ukkugAtayHKMbMtkN0DoHLkf_WrHdHEmKlH_t1VYp52dbE6G2JcOy7nmFRL/pub?gid=0&single=true&output=csv";

function getProductImage(model: string, color: string): string {
  const m = model.toLowerCase();
  const c = color.toLowerCase();
  
  // iPhone 16
  if (m.includes("16")) {
    if (m.includes("pro")) {
      if (c.includes("desert") || c.includes("desierto")) return "https://http2.mlstatic.com/D_NQ_NP_2X_864108-MLA99979989417_112025-F.webp";
      if (c.includes("natural")) return "https://http2.mlstatic.com/D_NQ_NP_2X_953074-MLA96418403356_102025-F.webp";
      if (c.includes("white") || c.includes("blanco")) return "https://http2.mlstatic.com/D_NQ_NP_2X_953899-MLA91205592337_082025-F.webp";
      if (c.includes("black") || c.includes("negro") || c.includes("space")) return "https://http2.mlstatic.com/D_NQ_NP_2X_977759-MLA96128070741_102025-F.webp";
      return "https://http2.mlstatic.com/D_NQ_NP_2X_953074-MLA96418403356_102025-F.webp";
    }
    if (c.includes("teal") || c.includes("verde")) return "https://http2.mlstatic.com/D_NQ_NP_2X_871483-MLA96419307766_102025-F.webp";
    if (c.includes("ultramarine") || c.includes("azul") || c.includes("blue")) return "https://http2.mlstatic.com/D_NQ_NP_2X_861979-MLA96185406877_102025-F.webp";
    if (c.includes("white") || c.includes("blanco")) return "https://http2.mlstatic.com/D_NQ_NP_2X_998293-MLA96417914648_102025-F.webp";
    if (c.includes("black") || c.includes("negro") || c.includes("midnight")) return "https://http2.mlstatic.com/D_NQ_NP_2X_838311-MLA99501450112_112025-F.webp";
    return "https://http2.mlstatic.com/D_NQ_NP_2X_838311-MLA99501450112_112025-F.webp";
  }
  
  // iPhone 15
  if (m.includes("15")) {
    if (m.includes("pro")) {
      if (c.includes("natural")) return "https://http2.mlstatic.com/D_NQ_NP_2X_900431-MLA102446479343_122025-F.webp";
      if (c.includes("blue") || c.includes("azul")) return "https://http2.mlstatic.com/D_NQ_NP_2X_703132-MLA95496855474_102025-F.webp";
      return "https://http2.mlstatic.com/D_NQ_NP_2X_900431-MLA102446479343_122025-F.webp";
    }
    if (c.includes("pink") || c.includes("rosa")) return "https://http2.mlstatic.com/D_NQ_NP_2X_801571-MLA95933968963_102025-F.webp";
    return "https://http2.mlstatic.com/D_NQ_NP_2X_784557-MLA95493924244_102025-F.webp";
  }

  // iPhone 14
  if (m.includes("14")) {
    if (m.includes("pro")) {
      if (c.includes("purple") || c.includes("morado")) return "https://http2.mlstatic.com/D_NQ_NP_2X_605126-MLM51559383638_092022-F.webp";
      if (c.includes("black") || c.includes("negro")) return "https://http2.mlstatic.com/D_NQ_NP_2X_738985-MLA95700713692_102025-F.webp";
      if (c.includes("gold") || c.includes("oro")) return "https://http2.mlstatic.com/D_NQ_NP_2X_612163-MLA95635471710_102025-F.webp";
      if (c.includes("silver") || c.includes("plata")) return "https://http2.mlstatic.com/D_NQ_NP_2X_770607-MLM51559385328_092022-F.webp";
      return "https://http2.mlstatic.com/D_NQ_NP_2X_605126-MLM51559383638_092022-F.webp"; // Default to purple
    }
    if (c.includes("red") || c.includes("rojo")) return "https://http2.mlstatic.com/D_NQ_NP_2X_885823-MLA99480154876_112025-F.webp";
    if (c.includes("yellow") || c.includes("amarillo")) return "https://http2.mlstatic.com/D_NQ_NP_2X_777636-MLA95941327205_102025-F.webp";
    if (c.includes("blue") || c.includes("azul")) return "https://http2.mlstatic.com/D_NQ_NP_2X_840663-MLA95700031740_102025-F.webp";
    if (c.includes("starlight") || c.includes("blanco")) return "https://http2.mlstatic.com/D_NQ_NP_2X_968017-MLA95683706020_102025-F.webp";
    if (c.includes("midnight") || c.includes("negro")) return "https://http2.mlstatic.com/D_NQ_NP_2X_788589-MLA95666848832_102025-F.webp";
    if (c.includes("purple") || c.includes("morado")) return "https://http2.mlstatic.com/D_NQ_NP_2X_904255-MLA95680311246_102025-F.webp";
    return "https://http2.mlstatic.com/D_NQ_NP_2X_840663-MLA95700031740_102025-F.webp"; // Default to blue
  }

  // iPhone 13
  if (m.includes("13")) {
    if (m.includes("pro")) {
      if (c.includes("blue") || c.includes("azul")) return "https://http2.mlstatic.com/D_NQ_NP_2X_707053-MLA96868171221_102025-F.webp";
      if (c.includes("graphite") || c.includes("grafito")) return "https://http2.mlstatic.com/D_NQ_NP_2X_985933-MLA97093826577_112025-F.webp";
      if (c.includes("gold") || c.includes("oro")) return "https://http2.mlstatic.com/D_NQ_NP_2X_865602-MLA94367446475_102025-F.webp";
      if (c.includes("silver") || c.includes("plata")) return "https://http2.mlstatic.com/D_NQ_NP_2X_989398-MLA96869963357_102025-F.webp";
      if (c.includes("green") || c.includes("verde")) return "https://http2.mlstatic.com/D_NQ_NP_2X_893606-MLU78730086939_082024-F.webp";
      return "https://http2.mlstatic.com/D_NQ_NP_2X_638847-MLA47781745408_102021-F.webp";
    }
    if (c.includes("starlight") || c.includes("silver") || c.includes("blanco")) return "https://http2.mlstatic.com/D_NQ_NP_2X_787642-MLA95698363690_102025-F.webp";
    if (c.includes("midnight") || c.includes("negro")) return "https://http2.mlstatic.com/D_NQ_NP_2X_965364-MLA99507152986_112025-F.webp";
    if (c.includes("blue") || c.includes("azul")) return "https://http2.mlstatic.com/D_NQ_NP_2X_725682-MLA94650390970_102025-F.webp";
    if (c.includes("red") || c.includes("rojo")) return "https://http2.mlstatic.com/D_NQ_NP_2X_788474-MLA101918153783_122025-F.webp";
    if (c.includes("pink") || c.includes("rosa")) return "https://http2.mlstatic.com/D_NQ_NP_2X_816590-MLA92473892676_092025-F.webp";
    if (c.includes("green") || c.includes("verde")) return "https://http2.mlstatic.com/D_NQ_NP_2X_663760-MLA94651770994_102025-F.webp";
    return "https://http2.mlstatic.com/D_NQ_NP_2X_709513-MLA47781591382_102021-F.webp";
  }

  // iPhone 12
  if (m.includes("12")) {
    if (m.includes("pro")) {
      if (c.includes("blue") || c.includes("azul")) return "https://http2.mlstatic.com/D_NQ_NP_2X_796427-MLA46081508810_052021-F.webp";
      if (c.includes("graphite") || c.includes("grafito")) return "https://http2.mlstatic.com/D_NQ_NP_2X_834378-MLA46078159682_052021-F.webp";
      if (c.includes("gold") || c.includes("oro")) return "https://http2.mlstatic.com/D_NQ_NP_2X_695472-MLA46080736565_052021-F.webp";
      if (c.includes("silver") || c.includes("plata")) return "https://http2.mlstatic.com/D_NQ_NP_2X_732817-MLA46081508192_052021-F.webp";
      return "https://http2.mlstatic.com/D_NQ_NP_2X_633634-MLA45741042793_042021-F.webp";
    }
    if (c.includes("red") || c.includes("rojo")) return "https://http2.mlstatic.com/D_NQ_NP_2X_799329-MLA45729987841_042021-F.webp";
    if (c.includes("blue") || c.includes("azul")) return "https://http2.mlstatic.com/D_NQ_NP_2X_665277-MLA45730184284_042021-F.webp";
    if (c.includes("white") || c.includes("blanco")) return "https://http2.mlstatic.com/D_NQ_NP_2X_829746-MLA45729987647_042021-F.webp";
    if (c.includes("purple") || c.includes("morado")) return "https://http2.mlstatic.com/D_NQ_NP_2X_774995-MLA46104680679_052021-F.webp";
    if (c.includes("black") || c.includes("negro")) return "https://http2.mlstatic.com/D_NQ_NP_2X_864889-MLA45729915884_042021-F.webp";
    if (c.includes("green") || c.includes("verde")) return "https://http2.mlstatic.com/D_NQ_NP_2X_979017-MLA45730399243_042021-F.webp";
    return "https://http2.mlstatic.com/D_NQ_NP_2X_713437-MLA45741042795_042021-F.webp";
  }

  // iPhone 11
  if (m.includes("11")) {
    if (m.includes("pro")) {
      return "https://http2.mlstatic.com/D_NQ_NP_2X_902787-MLA32194848035_092019-F.webp";
    }
    return "https://http2.mlstatic.com/D_NQ_NP_2X_656548-MLA46114829749_052021-F.webp";
  }

  return "https://help.apple.com/assets/65E22B08920D9D5E810E3B7D/65E22B0E090F8A5D4A066744/es_ES/89e50e9329437946927a7605d398f566.png";
}

function parsePrice(val: string | undefined): number {
  if (!val) return 0;
  let clean = val.replace(/[^0-9.,]/g, '').trim();
  if (!clean) return 0;
  const hasComma = clean.includes(',');
  const hasDot = clean.includes('.');
  if (hasComma && hasDot) {
    clean = clean.replace(/\./g, '').replace(',', '.');
  } else if (hasComma) {
    const parts = clean.split(',');
    if (parts[parts.length - 1].length === 3) clean = clean.replace(/,/g, '');
    else clean = clean.replace(',', '.');
  } else if (hasDot) {
    const parts = clean.split('.');
    if (parts[parts.length - 1].length === 3 || parts.length > 2) clean = clean.replace(/\./g, '');
  }
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
}

function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') inQuotes = !inQuotes;
    else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function fetchWithRetry(url: string, retries = 3, backoff = 1000): Promise<Response> {
  try {
    const response = await fetch(url);
    if (!response.ok && retries > 0) throw new Error(`Status ${response.status}`);
    return response;
  } catch (err) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, retries - 1, backoff * 2);
    }
    throw err;
  }
}

export async function fetchLiveProducts(): Promise<Product[]> {
  try {
    const response = await fetchWithRetry(STOCK_URL);
    const text = await response.text();
    const csvContent = text.includes('/* O_o */') ? text.replace(/^.*\("|\"\);?$/g, '') : text;
    const lines = csvContent.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return PRODUCTS;
    return lines.slice(1).map((line, index) => {
      const cols = parseCSVLine(line);
      const name = cols[0] || "";
      const usdPrice = parsePrice(cols[5]);
      if (!name || usdPrice === 0) return null;
      return {
        id: `row-${index}`,
        name,
        capacity: cols[1] || "",
        color: cols[2] || "",
        condition: (cols[3] || "").toLowerCase().includes("excelente") ? Condition.Excellent : ((cols[3] || "").toLowerCase().includes("bueno") ? Condition.Good : Condition.New),
        battery: cols[4] || "",
        usdPrice,
        listPriceArs: parsePrice(cols[8]),
        discountPriceArs: parsePrice(cols[6]),
        isOffer: (cols[10] || "").toLowerCase().includes("si"),
        image: cols[11] || getProductImage(name, cols[2] || "")
      } as Product;
    }).filter((p): p is Product => p !== null);
  } catch (error) {
    return PRODUCTS;
  }
}

export async function fetchTradeInValues(): Promise<TradeInItem[]> {
  try {
    const response = await fetchWithRetry(CANJE_URL);
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 1) return [];

    const header = parseCSVLine(lines[0].toLowerCase());
    let priceColIdx = header.findIndex(h => h.includes('precio') || h.includes('valor') || h.includes('usd') || h.includes('recepción'));
    
    if (priceColIdx === -1 && lines.length > 1) {
       const firstDataRow = parseCSVLine(lines[1]);
       for (let i = firstDataRow.length - 1; i >= 0; i--) {
         if (!isNaN(parsePrice(firstDataRow[i])) && parsePrice(firstDataRow[i]) > 10) {
           priceColIdx = i;
           break;
         }
       }
    }
    
    if (priceColIdx === -1) priceColIdx = 1;

    const startIdx = lines[0].toLowerCase().includes('modelo') ? 1 : 0;

    return lines.slice(startIdx).map(line => {
      const cols = parseCSVLine(line);
      const model = cols[0] || "";
      const valueUsd = parsePrice(cols[priceColIdx]);
      return (model && valueUsd > 0) ? { model, valueUsd } : null;
    }).filter((item): item is TradeInItem => item !== null);
  } catch (error) {
    return [];
  }
}
