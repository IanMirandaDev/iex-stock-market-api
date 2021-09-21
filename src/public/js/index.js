/* eslint-disable no-undef */

const socket = io();

const selectCompany = $('#selectCompany');

selectCompany.change(() => {
  loadingInterface();
  socket.emit('changeCompany', selectCompany.val());
});

socket.on('quoteUpdate', (stockData) => updateInterface(stockData));

function updateInterface(stockData) {
  const { title, quoteData, companyData } = stockData;

  if (quoteData.symbol == selectCompany.val()) {
    $(document).attr('title', title);
    $('#companyName').html(title);

    $('#quoteLatestPrice').html(`${quoteData.latestPrice } <strong id="quoteChangeString" class="${ quoteData.quoteChangeClassView }">${ quoteData.quoteChangeString }</strong>`);
    $('#quotePreviousClose').html(quoteData.previousClose);
    $('#quotePreviousVolume').html(quoteData.previousVolume);
    $('#quoteYearsRange').html(`${ quoteData.week52Low } - ${ quoteData.week52High }`);

    if (quoteData.low && quoteData.high) {
      $('#quoteDaysRange').html(`${ quoteData.low } - ${ quoteData.high }`);
    }

    if (companyData) {
      $('#companyIndustry').html(companyData.industry);
      $('#companyEmployees').html(companyData.employees);
      $('#companyDescription').html(companyData.description);
      $('#companyWebsite').html(`<a href="${ companyData.website }" target="blank">${ companyData.website }</a>`);
    }

    $('#quoteDataLoading').addClass('d-none');
    $('#companyDataLoading').addClass('d-none');

    $('#quoteDataTable').show();
    $('#companyDataTable').show();
  }
}

function loadingInterface() {
  const title = `Searching ${selectCompany.find(':selected').html()}`;
  $(document).attr('title', title);
  $('#companyName').html(title);

  $('#quoteLatestPrice').html('');

  $('#quoteDataTable').hide();
  $('#companyDataTable').hide();

  $('#quoteDataLoading').removeClass('d-none');
  $('#companyDataLoading').removeClass('d-none');
}
