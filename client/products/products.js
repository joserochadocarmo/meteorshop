this.productlist = new ReactiveVar([]);

Template.products.created = function () {
    //getProdutosYQL("query");
};

Template.products.helpers({
    'productlist':function(){
        //console.log(1);
        //return Products.find({catName:Session.get('category')});        
        return productlist.get();
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
        getProdutosYQL(tmpl.find('.search').value);
    }
});



function getProdutosYQL(query) {
    if(!query) return;
    productlist.set([]);
    var yq = 'select div.div from data.html.cssselect where url="https://www.supplementcentral.com/index.php?filter_name=' + encodeURIComponent(query) + '&route=product%2Fisearch&limit=10" and css=".product-list"';
    $.YQL(yq, function(data) {
        var results = data.query.results.results;            
        var html =[];
        for(index in results){
            //console.log(results[index].div);
            var produtoName = results[index].div.div.h2.a.content;
            var priceOld=0,priceNew=0;
            for(p in results[index].div.div.div){
              //console.log(results[index].div.div.div);
              if(results[index].div.div.div[p].class=="price"){                  
                  try {
                      priceOld = results[index].div.div.div[p].span[0].content;
                      priceNew = results[index].div.div.div[p].span[1].content;
                  }
                  catch(err) {
                    console.trace("Erro:" +err);
                  }
                }
            }
            html.push({thumb:'applepie.jpeg',name:produtoName,desc:"Supplement Central",price:s.trim(priceOld.trim(),"$"),priceNew:s.trim(priceNew.trim(),"$"), catName:'Fruity'});
        }
        html.push.apply(html,productlist.get());
        html=_(html).sortBy(function(obj){return obj.name.toLowerCase()})
        //html=_.filter(html,function(obj){if(s.contains(obj.name.toLowerCase(),"now")) return true;})
        //html.reverse()
        productlist.set(html);
    });

    yq = 'select div.ul.li from data.html.cssselect where url="http://www.samedaysupplements.com/catalogsearch/result/?cat=0&q=' + encodeURIComponent(query) + '" and css=".category-products"';
    $.YQL(yq, function(data) {
        var results = data.query.results;
        console.warn(results);
        var html =[];
        for(index in results){
            for(j in results[index]){
                var produtoName = results[index][j].div.ul.li.h2.a.content;
                var priceOld=0,priceNew=0;    
                for(p in results[index][j].div.ul.li.div){
                    if(results[index][j].div.ul.li.div[p].class=="price-box"){                  
                      //console.log(results[index][j].div.ul.li.div[p]);
                      try {
                        priceOld = results[index][j].div.ul.li.div[p].p[0].span[1].content;
                        priceNew = results[index][j].div.ul.li.div[p].p[1].span[1].content;
                      }
                      catch(err) {
                        console.trace("Erro:" +err);    
                      }
                    }
                }
            }
            html.push({thumb:'applepie.jpeg',name:produtoName,desc:"Sameday Supplements",price:s.trim(priceOld.trim(),"$"),priceNew:s.trim(priceNew.trim(),"$"), catName:'Fruity'});
        }
        html.push.apply(html,productlist.get());
        html=_(html).sortBy(function(obj){return obj.name.toLowerCase()})
        //html=_.filter(html,function(obj){if(s.contains(obj.name.toLowerCase(),"now")) return true;})
        //html.reverse()
        productlist.set(html);
    });
};

