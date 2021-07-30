import StockMarketService from '../services/StockMarketService.js';
class HomePageController {
	async show(req, res) {
		try {
			const symbol = 'aapl';

			const stockMarket = new StockMarketService(symbol);
			var companyData = await stockMarket.getCompanyData();

			if (companyData.dataValues) {
				companyData = companyData.dataValues;
			}

			if (companyData.website && companyData.website.split('https://').length < 2) {
				companyData.website = 'https://'+companyData.website;
			}

			const quoteData = await stockMarket.getQuoteData();

			const viewData = { 
				title: `${companyData.companyName} (${companyData.symbol})`,
				url: `http://${req.headers.host}${req.originalUrl}`,
				companyData,
				quoteData
			};
            
			return res.render('index', viewData);
		} catch(err) {
			console.error(err);
			return res.json('Server error on get company details');
		}
	}
	
	async showCompany(req, res) {
		try {
			const { symbol } = req.params;

			const stockMarket = new StockMarketService(symbol);
			var companyData = await stockMarket.getCompanyData();

			if (companyData.dataValues) {
				companyData = companyData.dataValues;
			}

			if (companyData.website && companyData.website.split('https://').length < 2) {
				companyData.website = 'https://'+companyData.website;
			}

			const quoteData = await stockMarket.getQuoteData();

			const viewData = { 
				title: `${companyData.companyName} (${companyData.symbol})`,
				url: `http://${req.headers.host}/`,
				companyData,
				quoteData
			};
            
			return res.render('index', viewData);
		} catch(err) {
			console.error(err);
			return res.json('Server error on get company details');
		}
	}
}

export default new HomePageController();