Session.setDefault('category', null);
Router.configure({
    layoutTemplate:'layout',
    yieldTemplates:{
        'products':{to:'products'},
        'cart':{to:'cart'},
        'categories':{to:'categories'}
    }
});
Router.map(function(){
    this.route('/','layout');
    this.route('products', {
        layoutTemplate:'layout',
        path:'/:name',
        data: function() {
            console.log(this.params.name);
            Session.set('category',this.params.name);
        },
        template:'layout'
    });
});

Template.registerHelper('currency', function(num){
    if(!num) return;
    if(num.indexOf("$") > -1) return num;
    return '$' + Number(num).toFixed(2);
});

// Yahoo Query Language Wrapper for jQuery
$.YQL = function(query, callback) {
    if (!query || !callback) {
        throw new Error('$.YQL(): Parameters may be undefined');
    }
    // Whole Query for JSON output
    var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + "&format=json&env=store://datatables.org/alltableswithkeys&callback=?" ;
    console.info(query);
    $.getJSON(url, callback);
};