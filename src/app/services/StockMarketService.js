import IEXClient from '../../modules/IEXClient.js';
import Company from '../models/Company.js';

async function getUpdatedCompanyData(IEX, companyDB) {
	const companyData = await IEX.getCompanyData();

	const now = new Date();

	const companyObject = {
		companyName: companyData.companyName,
		symbol: companyData.symbol,
		industry: companyData.industry,
		website: companyData.website,
		employees: companyData.employees,
		description: companyData.description,
		lastUpdate: now
	};
    
	if (!companyDB) {
		return Company.create(companyObject);
	} else {
		await companyDB.update(companyObject);
	}

	return companyData;
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
            
			var companyData = companyDB ? companyDB.dataValues : null;
            
			if (!companyData) {
				companyData = await getUpdatedCompanyData(IEX);
			} else {
				const now = new Date();
				const registerAge = companyData.lastUpdate;
				registerAge.setHours(registerAge.getHours() + 24);
                
				if (now > registerAge) {
					companyData = await getUpdatedCompanyData(IEX, companyDB);
				}
			}
            
			return companyData;
		} catch(err) {
			console.error(err);
			return err;
		}
	}
    
	async getQuoteData() {
		try {
			const quoteData = await this.IEX.getQuoteData();
            
			const changePercentFormatted = new Intl.NumberFormat('nu', { maximumFractionDigits: 2 }).format(quoteData.changePercent) + '%';

			quoteData.latestPrice = new Intl.NumberFormat('nu', { maximumFractionDigits: 2 }).format(quoteData.latestPrice);
			quoteData.change = new Intl.NumberFormat('nu', { maximumFractionDigits: 2 }).format(quoteData.change);
			quoteData.quoteChangeClassView = 'text-danger';
            
			if (quoteData.change > 0) {
				quoteData.change = '+'+quoteData.change;
				quoteData.quoteChangeClassView = 'text-success';
			}
			const quoteChange = `${quoteData.change} (${changePercentFormatted})`;
            
			quoteData.quoteChange = quoteChange;
            
			return quoteData;
		} catch(err) {
			console.error(err);
			return err;
		}
	}
}

export default StockMarketService;