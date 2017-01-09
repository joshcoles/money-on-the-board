
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('campaigns').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('campaigns').insert({
          game_id: 1,
          user_id: 1,
          handle: '@SensMotB',
          title: 'Season Opener',
          charity_name: 'Senators Foundation',
          charity_url: 'https://secure.e2rm.com/registrant/DonationPage.aspx?eventid=13871&langpref=en-CA&Referrer=https%3a%2f%2fadmin.e2rm.com%2fEventSummary.aspx',
          description: 'The Ottawa Senators Foundation empowers children and youth to reach their full potential by investing in social recreation and education programs that promote both physical and mental wellness.',
          image_url: 'https://www.thestar.com/content/dam/thestar/opinion/editorials/2012/01/04/the_future_looks_bleak_for_canadian_minor_hockey/childhockey.jpeg'
        }),
        knex('campaigns').insert({
          game_id: 1,
          user_id: 1,
          handle: '@BC_SPCA',
          title: 'Paws for a Cause',
          charity_name: 'BC SPCA',
          charity_url: 'https://secure3.convio.net/bcspca/site/Donation2;jsessionid=0224FC15A969EFB04BE5417BC3ECC1F5.app337b?5360.donation=form1&df_id=5360&utm_source=header&utm_medium=button&utm_term=otg&utm_content=donate%20button&utm_campaign=otg&__utma=79048150.2084630242.1483572260.1483687242.1483924171.4&__utmb=79048150.1.10.1483924171&__utmc=79048150&__utmx=-&__utmz=79048150.1483572317.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)&__utmv=-&__utmk=109644355',
          description: 'The BC SPCA is a non-profit organization dedicated to protecting and enhancing the quality of life for domestic, farm and wild animals in B.C.',
          image_url: 'http://www.mynelsonnow.com/wp-content/uploads/2015/04/spca.gif'
        }),
        knex('campaigns').insert({
          game_id: 1,
          user_id: 1,
          handle: '@BCChildrensHosp',
          title: 'For Children We Care',
          charity_name: 'BC Childrens Hospital',
          charity_url: 'https://secure.bcchf.ca/donate/donation-New.cfm?&utm_source=BCCHwebsite&utm_medium=Donatepage&utm_campaign=BCCHweb-donate',
          description: 'BC Children’s Hospital is a leader in general and specialized pediatric services, and is the province’s foremost teaching and research facility for child health.',
          image_url: 'http://www.bcchildrens.ca/_layouts/15/CUSTOM/EWI/assets/img/bcchildrenshospital/logo.png'
        })
      ]);
    });
};
