$(document).ready(function(){

  // split the urls to make it manageable
  let BASE_URL = "https://api.coingecko.com/api/v3/";
  let ENDPOINT = "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h";
  let GLOBAL = "global";

  //concatenate the urls
  let url = BASE_URL + ENDPOINT;
  let url1 = BASE_URL + GLOBAL;

  // format function for big numbers in currency
  const formatter1 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
  })
  // format functon for small numbers in currency
  const formatter2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  })

  // format functon for smaller non-currency numbers
  const formatter5 = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 5
  })
  // format functon for big non-currency numbers
  const formatter3 = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
  })
  // format functon for percentages
  const formatter4 = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
  })

  //get the data from CG api
  let api = 0;
  fetch(url).then(response => {

    response.json().then(data => {
      api = data;
      console.log(api);

      //function - loads the contents of the array
      function redrawList(){
        //create var for the table
        let table = $("#outputTable");
        //clears the page just in case there is a previous load
        table.html("");
        // loops the list in the array into the table listed
        $.each(api,function(index,value){

          // calculate Rank
          $("<td/>").html( value.market_cap_rank).appendTo(table);
          // calculate coin image, name and symbol
          $("<td/>").html( "<img src='"+value.image+"' width='25'/>" + " " +value.name + " | (" +  (value.symbol.toUpperCase()) +")" ).appendTo(table);
          // calculate market cap
          $("<td/>").html( formatter1.format(value.market_cap)).appendTo(table);
          //calculate coin price
          $("<td/>").html( formatter2.format(value.current_price)).appendTo(table);
          // calculate volume
          $("<td/>").html( formatter1.format(value.total_volume)).appendTo(table);
          //calculate circulating supply
          $("<td/>").html( formatter3.format(value.circulating_supply) + " " + (value.symbol.toUpperCase())).appendTo(table);

          // calculate Change24H and show green or red progress
          if (formatter4.format(value.price_change_percentage_24h) > 0 || formatter4.format(value.price_change_percentage_24h) == 0) {

            //output as green
            $("<td/>").html( "<span class='greenbold'>" + "+" + formatter4.format(value.price_change_percentage_24h) + "% </span>").appendTo(table);

          } else {

            //output as red
            $("<td/>").html( "<span class='redbold'>" + formatter4.format(value.price_change_percentage_24h) + "%</span>").appendTo(table);
          };

          // calculate Price Diff24H and show gain or loss amounts
          if (formatter5.format(value.price_change_24h) > 0) {

            //output as green
            $("<td/>").html( "<span class='green'>" + "+" + formatter5.format(value.price_change_24h) + "</span>").appendTo(table);

          } else {

            //output as red
            $("<td/>").html( "<span class='red'>"+formatter5.format(value.price_change_24h) + "</span>").appendTo(table);

          };

          //acts like carriage return to open a new row
          $("<tr/>").html( value).appendTo(table);
          console.log(table);

        });
      };
      redrawList();
    });
  });

});