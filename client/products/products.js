this.productlist = new ReactiveVar();

Template.products.created = function () {
    var html =[];
    var yq = 'select div.div from data.html.cssselect where url="https://www.supplementcentral.com/index.php?filter_name=carnivor&route=product%2Fisearch&limit=10" and css=".product-list"';
        $.YQL(yq, function(data) {
            //console.debug(data);
            //Products.insert({thumb:'blackberrysmoothie.jpeg',name:'Teste',desc:'Teste',price:2.50,catName:'Fruity'});
            var post = data.query.results.results;
            html.push({thumb:'applepie.jpeg',name:'Apple Pie',desc:'Decadent Apple Pie',price:2.50,catName:'Fruity'});
            html.push({thumb:'blackberrysmoothie.jpeg',name:'Blackberry Smoothie',desc:'Luscious Blackbery Smoothie',price:2.50,catName:'Fruity'});
            html.push({thumb:'mod1.jpg',name:'EGO Twist',desc:'Ego Twist Mod',price:23.50,catName:'Mods'});
            productlist.set(html);
        });
};

Template.products.helpers({
    'productlist':function(){
        //console.log(1);
        
    //return Products.find({catName:Session.get('category')});
    
    return productlist.get();
    },
    'productlist1':function(){
        var yq = 'select div.div from data.html.cssselect where url="https://www.supplementcentral.com/index.php?filter_name=carnivor&route=product%2Fisearch&limit=10" and css=".product-list"';

        $.YQL(yq, function(data) {
            //console.debug(data);
            var post = data.query.results.results;
        });
    return [{thumb:'applepie.jpeg',name:'Apple Pie',desc:'Decadent Apple Pie',price:2.50,catName:'Fruity'},
            {thumb:'blackberrysmoothie.jpeg',name:'Blackberry Smoothie',desc:'Luscious Blackbery Smoothie',price:2.50,catName:'Fruity'},
            {thumb:'mod1.jpg',name:'EGO Twist',desc:'Ego Twist Mod',price:23.50,catName:'Mods'}];
    },
    'catnotselected':function(){
        return Session.equals('category',null);
    },
    'category':function(){
        return Session.get('category');
    }
}) 

Template.product.events({
    'click .addcart':function(evt,tmpl){
        var qty = tmpl.find('.prodqty').value;
        var product = this._id;
        var sessid = Meteor.default_connection._lastSessionId;
        Meteor.call('addToCart',qty,product,sessid);
    }
});

Template.search.events({
    'click .search':function(evt,tmpl){
        console.log("sdfsd");
    }
});

// Yahoo Query Language Wrapper for jQuery
$.YQL = function(query, callback) {
    if (!query || !callback) {
        throw new Error('$.YQL(): Parameters may be undefined');
    }

    // Whole Query for JSON output
    var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + "&format=json&env=store://datatables.org/alltableswithkeys&callback=?" ;
    //console.info(url);
    $.getJSON(url, callback);

};
