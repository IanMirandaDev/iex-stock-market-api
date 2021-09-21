import StockMarketService from '../services/StockMarketService.js';
class HomePageController {
  async show(req, res) {
    try {
      const symbol = req.params.symbol || 'aapl';

      const stockMarket = new StockMarketService(symbol);
      var companyData = await stockMarket.getCompanyData();

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
      return res.status(500).json('Server error on show company details');
    }
  }
}

export default new HomePageController();
