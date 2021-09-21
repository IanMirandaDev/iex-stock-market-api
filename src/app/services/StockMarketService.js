import IEXClient from '../../modules/IEXClient.js';
import Company from '../models/Company.js';

async function getUpdatedCompanyData(IEX, companyDB) {
  try {
    const companyData = await IEX.getCompanyData();
        
    if (companyDB) {
      companyData.lastUpdate = new Date();
      const { dataValues } = await companyDB.update(companyData);
      return dataValues;
    }
        
    const { dataValues } = await Company.create(companyData);
    return dataValues;
  } catch(err) {
    console.error(err);
    return { error: 'Server error on get and update company data' };
  }
}

function decimalFormat(number) {
  return new Intl.NumberFormat('nu', { maximumFractionDigits: 2 }).format(number);
}

class StockMarketService {
  constructor(symbol) {
    this.symbol = symbol;
    this.IEX = new IEXClient(symbol);
  }

  async getCompanyData() {
    try {
      const { IEX, symbol } = this;
      const companyDB = await Company.findOne({ where: { symbol: symbol } });
            
      if (!companyDB) {
        return getUpdatedCompanyData(IEX);
      }
            
      const { dataValues } = companyDB;
      const { lastUpdate } = dataValues;
      lastUpdate.setHours(lastUpdate.getHours() + 24);
            
      if (new Date() > lastUpdate) {
        return getUpdatedCompanyData(IEX, companyDB);
      }
            
      return dataValues;
    } catch(err) {
      console.error(err);
      return { error: 'Server error on get company data' };
    }
  }
    
  async getQuoteData() {
    try {
      const quoteData = await this.IEX.getQuoteData();
            
      quoteData.quoteChangeClassView = 'text-danger';
      quoteData.changePercent = decimalFormat(quoteData.changePercent) + '%';
      quoteData.latestPrice = decimalFormat(quoteData.latestPrice);
      quoteData.change = decimalFormat(quoteData.change);
            
      if (quoteData.change > 0) {
        quoteData.quoteChangeClassView = 'text-success';
        quoteData.change = `+${quoteData.change}`;
      }
            
      quoteData.quoteChangeString = `${quoteData.change} (${quoteData.changePercent})`;

      return quoteData;
    } catch(err) {
      console.error(err);
      return { error: 'Server error on get quote data' };
    }
  }
}

export default StockMarketService;
