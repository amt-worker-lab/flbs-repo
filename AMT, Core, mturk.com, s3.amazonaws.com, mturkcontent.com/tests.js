
AMT___items_factory.prototype.create_dashboard_find_url({
  search: {
    str_add_to_searches_hidden: ' url:linkedin.com/company/', //
    skips: {
      fork: 'load_skips_el3',
      key: 'load_skips_el9',
    }
  },
  searches:[ // 
    compName,
    compNameInQuotes,
    o.comp + ' (company OR organization)',
  ],
  search_results: {
    use_full_urls: true,
    bold: {
      black: compName.split(' '),
    },
  },
  out_element: inp, // HTML input form element
  parent: div_out, // HTML div element to attach to
  offsetTop: 0,
  AmtRecordAndSubmit: true,
  AutoReturnAcceptIfZero: true,
});

// Search LinkedIn companies
AMT___items_factory.prototype.create_dashboard_find_url({
  search: {
    str_add_to_searches_hidden: ' url:linkedin.com/company/', //
  },
  searches:[ // 
    compName,
    compNameInQuotes,
    compName + ' (company OR organization)',
  ],
  search_results: {
    use_full_urls: true,
    bold: {
      black: compName.split(' '),
    },
  },
  out_element: inp, // HTML input form element
  parent: div_out, // HTML div element to attach to
  offsetTop: 0
});

