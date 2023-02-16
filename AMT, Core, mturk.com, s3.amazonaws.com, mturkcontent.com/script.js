/**
 * Document Changes
 * 
 * Format: Date tab-tab Description
 * 
 */
var beginRunTime = new Date().getTime();

/**
 * FUNCTION MT__RUN
 * Scripts execute here, amazonaws.com, mturkcontent.com
 * (mturk.com is in top_window/parent_window)
 * 
 * 
 */
function MT__RUN() {
  // Init Scrapy Tasks
  // NOTE: If the init__scrapy function returns false
  // then there was an "s" match. In which case end now.
  //
  //
  if (!init__scrapy()) return;
  // ...
  // Begin tasks...
  //
  // Global vars...
  var s, s2, s3;
  var ih = document.body.innerHTML; // ...
  
  /**
   * TASKS
   * 
   */
  
  var s = 'Listen to a speech sentence and then choose a score for the audio sample you\'ve just heard.';
              // Listen to a speech sentence and then choose a score for the audio sample you've just heard.
  console.log(ih);//l
  if (ih.indexOf(s) != -1)
  {
    console.log('x');
    var run = function() {}
    run.prototype.f = function() {
      window.ondblclick = function() {
        console.log('x');
        new AMT___core_factory().nextTab();
        // document.querySelector("body > crowd-form > form > crowd-button").click();
        document.querySelector("body > crowd-form > form > crowd-classifier")
          .shadowRoot.querySelector("#actionsContainer > awsui-button > button").click();
      }
    }
    new run().f();
  }
  // "Company Logos", "Company"
  var s = '\n    <p>Find a company a company logo for a given company.</p>\n    <p>Find a company logo. Right click on the logo. Click on copy image url. Paste the image URL in the field below.</p>\n    <img width="150" height="200" src="https://directlyapply.com/images/mturkCopyImageAddressLogo.png">\n';
  if (ih.indexOf(s) != -1)
  {
    var run = function() {}
    run.prototype.f = function() {
      console.log('x');
      console.log(document.body.innerText);
      // var b = document.querySelector("body > crowd-form > form > div > p:nth-child(4) > b")//#.innerText;
      // console.log('b',b)
      var b = /<p>Find the logo for: <b>([^<]+)<\/b>/.exec(document.body.innerHTML)[1];

      var d1 = ''.div({
        style:
        'position:absolute;top:30px;left:0%;width:99%;height:400px;background-color:#eee;border:1px solid blue;overflow:auto;',
        a: true // append body
      });

      // var output = null;

      // six images, three per row
      var c = 0;
      var ims = [];
      for (var i=0; i<6; i++) {
        var im = document.createElement('img');
        im.setAttribute('style', 'width:49%; max-height:200px; border:1px solid #444;');
        im.url_ = null;
        im.onclick = function() {
          this.style.border = '6px solid green';
          if (this.url_) {
            // Apparently the crowd-input is the "real" form, not the 
            // input that's within the shadow root. So while we set
            // the value of the input in the shadow root, in order
            // to see it appear on screen, within the form we must
            // set form.imageUrl.value? Either that or since both
            // elements are named 'imageUrl', only the first on the 
            // page is being submitted to the server (i.e. viewable by
            // the network tab).
            // Also, document.getElementsByName('imageUrl') returns
            // only ONE element.
            console.log(this.url_, document.getElementsByName('imageUrl'));
            
            // update shadow root input as well
            
            var imgInp = document.getElementsByName('imageUrl')[0]
            imgInp.setAttribute('value', this.url_);
            // .value = this.url_;
            imgInp.shadowRoot.querySelector('input').value = this.url_;
            // var shadowInp = document.getElementsByName('imageUrl')[0].shadowRoot.querySelector('input')
            // shadowInp.dispatchEvent(new Event('click'));
            // imgInp.dispatchEvent(new Event('click'));


            // document.querySelector("body > crowd-form > form > div > crowd-input").value = this.url_;

            // do submit + nextTab
            // new AMT___core_factory().nextTab();
            // doSubmit(document.forms[0]);
            // console.log(document.forms[0]);
            // var cf = document.querySelector("body > crowd-form");
            // doSubmit(document.querySelector("body > crowd-form > form"));

            // forms not working... 
            // how about click the button revealed in the elements panel?
            new AMT___core_factory().nextTab();
            document.querySelector("body > crowd-form > form > crowd-button").click();
            // new AMT___core_factory().nextTab();
          }
        }
        d1.append(im);
        // c += 1;
        ims.push(im);
      }

      // height
      new AMT___core_factory().el_innerHeight({
        elements: [d1],
        offset: 30 // offset top
      });

      // load from server
      // ex http://192.168.1.86/mturk/.scripts/test.py?kw=foo
      var url_ = AMT___POPUP___PROXY_REDACTED_ + '/mturk/.scripts/test.py?kw=' + encodeURIComponent(b);
      console.log(url_);
      chrome.extension.sendMessage({ddg_image: {url: url_}},
        function(response) {
          // console.log(response, response.responseText, response.responseText.replace(/\\n$/,''));
          console.log(response);
          console.log(response.responseText.substr(0, response.responseText.length - 1))
          var rs = JSON.parse(response.responseText);
          // var rs = JSON.parse(response.responseText.substr(0, response.responseText.length - 1));
          console.log(rs);
          // MT___page1_async_onload(response);
          for (var i=0;i<rs.length;i++) {
            console.log(ims[i]);
            ims[i].url_ = rs[i].image;
            ims[i].src = AMT___POPUP___PROXY_REDACTED_ + '/mturk/util.php?AMT__output_html_from_URL=' +
              encodeURIComponent(rs[i].image) + '&AMT__output_html_from_URL__options={}';
            //rs[i].image;
            if (i > 4) {
              break;
            }
          }
        }
      );

      function load() {
        // move
        var x = document.querySelector("body > crowd-form > form > div > p:nth-child(4) > b")
        x.setAttribute('style', 'position:absolute;top:0;left:0;padding:0;margin:0;')
        var x = document.querySelector("body > crowd-form > form > div > crowd-input")
          .shadowRoot.querySelector("#input-1 > input");
        // output = x;
        x.setAttribute('style', 'position:fixed;top:0;left:50%;padding:0;margin:0;')
        console.log('input name:' + x.name);
      }
      // set a timer to move the <b> to 0/0 and the <input> to 0/50%
      var loaded = false;
      var intv = window.setInterval(function() {
        // var x = document.getElementsByName('firstName')[0].shadowRoot;
        var x = document.querySelector("body > crowd-form > form > div > p:nth-child(4) > b")
        if (x != null && !loaded) {
          loaded = true;
          clearInterval(intv);
          load();
        }
      }, 200);
    }
    new run().f();
  }

  // Bobby (Reformat Names (V1))
  var s = 'Reformat the persons name into the respective name segments. If the name is a company copy then paste the full unformatted name into both "First Name" and "Last Name" boxes. Disregard middle names if provided. In the event there are two names, fill out the designated box with both respective names joined by a column (ex. First Name: John | Jack, Last Name: Smith | Johnson).';
  if (ih.indexOf(s) != -1)
  {
    var run = function() {}
    run.prototype.f = function() {
      console.log('x');
      //////////
      // Styles
      // GM_addStyle('body,p,h2,h1,h3,h4,ul,li,form,input,span,p,div,textarea {margin:0;padding:0;font-size:12px;}');
      // // Instructions
      // GM_addStyle('.panel-primary {position:absolute;top:1000px;}');
      // //~ GM_addStyle('table {margin-bottom:-20px !important;}');
      // // Content
      // GM_addStyle('.container {margin:0 !important;padding:0 !important;margin-top:0px !important;width: 50%;}');
      // //~ GM_addStyle('#field1 {margin:0 !important;padding:0 !important;position:absolute;top:300px;left:0px;width:10%}');
      // // Other
      // GM_addStyle('input[type="text"]{margin:0 !important;padding:0 !important;position:absolute;top:0px;left:30px;width:100%;height:48px;zoom:1.6;}');
      // GM_addStyle('body {background-color: #efe;}');
      GM_addStyle('form {margin-top: 300px;}');
      //~ GM_addStyle('.exe:hover {background-color:orange;}');
      //~ GM_addStyle('#submitButton {width:100%;height:200px;margin-top:-160px;}');
      // End styles
      /////////////
      // document.querySelector("body > crowd-form").firstChild.style.marginTop = '200px';
      

      // var b = document.getElementsByTagName('b');
      // var o = {
      //   u: b[1].innerText.trim().replace(/äó»/gi, '\''),
      //   q: [
      //     document.getElementsByName('Q5FreeTextInput')[0],
      //   ],
      // }
      
      // console.log(o);
      // AMT___addUserDecision(
      //   'BenText,2018', function() {
      //     return o.u;
      //   },
      //   ['Name(Q5FreeTextInput)[0]']
      // )
      /* BEGIN ITEMS */
      var d1 = document.createElement('div');
      d1.setAttribute('style',
        'position:absolute;top:100px;left:20%;width:80%;height:60px;overflow:auto;background-color:#eee;border:1px solid blue;'
      );
      document.body.appendChild(d1);
      
      // annotate
      // Feature to add:
      //    Need: "in house", not "in the house",
      //      but there are two fields. So appendToField
      //      does not work!
      // Feature to add:
      //    Add: Mouseover color
                     //'<p>SAWYER JACK E ESTATE</p>
// <p><strong>First Person Name (unformatted):</strong></p>
//                <p>SAWYER JACK E ESTATE</p>
//regular expression
      
      // var x = Array.from(window.document.body.children).reverse().find(
      //   (item) => item.localName === 'crowd-form' && item.shadowRoot !== null && item.shadowRoot.querySelector('input')
      // );
      // var x = document.querySelector("body > crowd-form > form > div > div > div:nth-child(5) > p:nth-child(2) > crowd-input").shadowRoot.querySelector("#input-1 > input");
      // var x = chrome.dom.openOrClosedShadowRoot(element);

      // console.log(x);

      console.log(document.getElementsByName('firstName')[0].openOrClosedShadowRoot);
      console.log(document.getElementsByName('firstName')[0].shadowRoot);
      console.log(document.getElementsByName('firstName')[0].firstChild);
      // console.log(document.querySelector('shadow-root'));
      
      // ondblclick, remove word from input
      // var ef = new AMT___events_factory();
      // ef.mouseup__delete_range({
      //   elements: [o.q[0]],
      //   blur_element: false,
      //   remove_whitespace: true,
      // });
      //sbm
      // document.getElementById('submitButton').onclick = function(e) {
      //   e.stopPropagation();
      //   e.preventDefault();
      //   o.q[0].value = o.q[0].value.trim();
      //   if (o.q[0].value == '') return false;
      //   AMT___recordAndSubmit();
      //   return;
      // }
      var loaded = false;
      var output = []; // global to fill later
      function load(){
        if (!loaded) {
          loaded = true;
        } else {
          return; //?
        }
        var a = /First Person Name \(unformatted\):<\/strong><\/p>\s+<p>([^<]+)<\/p>/.exec(ih);
        output = [
          document.getElementsByName('firstName')[0].shadowRoot.querySelector('input'),
          document.getElementsByName('lastName')[0].shadowRoot.querySelector('input'),
        ];
        // for (i in output) {
        //   output[i].style.position = 'absolute';
        //   output[i].style.top = '0px';
        // }
        // output[1].style.left = '300px';
        var x = document.querySelector("body > crowd-form > form > div > div > div:nth-child(5)");
        x.style.position = 'absolute';
        x.style.top = '0';
        x.style.backgroundColor = '#eee';
        x.style.border = '1px solid black';

        var buttons = new AMT___items_factory().create_annotation_to_output_fields({
          textToAnnotate: a[1],
          output_fields: output,
          callback_mouseup: function(addField) {
            console.log(addField);
            console.log(addField.value);
          },
          // appendToField: true,
          // appendToField_glue: ' ',
          //~ delimeter: '',
          focusToField: false,
          style: 'border-radius:2px;border:0;border-color:0a0c33;background-color:white;border-style:solid;cursor:pointer;zoom:1.2;',
        });
        d1.appendChild(buttons);

        // submit
        window.addEventListener('keyup', function(e) {
          // Submit button (CTRL key)
          console.log(e.keyCode);
          if (e.keyCode == 17) {
            e.stopPropagation();
            e.preventDefault();
            //document.getElementsByTagName('img')[0].click();
            if (output[0].value.trim() != '' && output[1].value.trim() != '') {
              new AMT___core_factory().nextTab();
              document.querySelector("body > crowd-form > form > crowd-button").shadowRoot.querySelector("#react-mount-point > div > awsui-button > button").click();
            }
            return false;
          }
        });
      }

      //
      var intv = window.setInterval(function() {
        var x = document.getElementsByName('firstName')[0].shadowRoot;
        if (x != null) {
          clearInterval(intv);
          load()
        }
      }, 200);
    }
    new run().f();
  };

  // "Alexander Gutin"
  var s = '<p>Once ChatGPT responds, click the <b>Copy code</b> link (see screenshot below). This will copy the text in the black box to your clipboard. Now <i>paste (Ctrl + V)</i> the code <i>exactly</i> as it is on your keyboard here:</p>';
  if (ih.indexOf(s) != -1)
  {
    var run = function() {}
    run.prototype.f = function() {
      alert('hi');
      console.log('hi');
      
    }
    new run().f();
  }
  
  
}
/*
 * END TOP WINDOW
 */
