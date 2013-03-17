/*!
 * WebservicesJS v1
 *
 * Copyright 2013 Cyril Pereira
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */
(function($) {

    var methods = {
        /**
         * Init method webservices
         * @param options
         */
        init : function(options)
        {
            options = options ? options : {};

            if ($('#forms').length == 0 && $('#debug').length == 0) {
                var hh = '<div class="row-fluid">' +
                        '<div class="span6" id="forms"></div>' +
                        '<div class="span6" id="debug"></div>' +
                        '</div>';
                $('body').append(hh);
            }
            $(this).webservices('formMaker',options);
        },
        /**
         * Generate all the forms from JSON
         */
        formMaker:function(options) {
            var _h = '';

            var loaderGif = options.loaderGif ? options.loaderGif : 'webservicesjs/ajax-loader.gif';
            
            this.each(function() {
                var form = this;
                _h += '<div class="gradiant">' +
                        '<form method="'+ form.method +'" action="' + form.action + '" class="form-horizontal ">' +
                        '<h4>' + form.title + '<img src="'+ loaderGif +'" /><br />' +
                        '<span class="muted">'+form.action+'</span></h4>';

                for (var a in form.inputs) {
                    var d = new Date();
                    var _id = 'f' + d.getTime()*Math.random();
                    var input = form.inputs[a];
                    _h += '<div class="control-group">' +
                            '<label class="span2" for="' + _id + '">' + input.label + '</label>' +
                            '<div class="controls">' +
                                '<input class="span12 input-mini" id="' + _id + '" name="' + input.name + '" type="' + input.type + '" value="' + input.defaultvalue + '"/>' +
                            '</div>' +
                          '</div>';
                }
                _h += '<div class="control-group">' +
                        '<div class="controls">' +
                            '<input type="submit" class="btn btn-primary btn-mini" />' +
                        '</div>' +
                      '</div>';

                _h += '</form>' +
                        '</div>';
            });
            $('#forms').html(_h);

            $(this).webservices('initForm',options);
        },
        /**
         * Init the form for ajax requests
         */
        initForm : function(options) {

            var useProxy = options.proxyPath ? true : false,
                loaderGif = options.loaderGif ? options.loaderGif : 'webservicesjs/ajax-loader.gif',
                proxyPath = options.proxyPath ? options.proxyPath : '';

            $('#loader').hide();
            $('form').each(function() {
                $(this).find('img').hide();
                $(this).submit(function() {

                    var timeStart = new Date().getTime();
                    $('#loader').show();
                    var $form = $(this);

                    var url = $form.attr('action');

                    var type = ($form.attr('method')=='GET') ? 'get' : 'post';
                    var data = {};
                    var variables = {};

                    $form.find('input[type=text],select').each(function() {
                        var v = $(this).val();
                        var n = $(this).attr('name');
                        variables[n] = v;
                    });

                    if(useProxy){
                        url=proxyPath;
                        variables.u = $form.attr('action');
                    }
                    
                    $($form).webservices('disableForm', true);
                    $('#debug').html('<img src="'+loaderGif+'" />processing...');

                    var xhr = $.ajax({
                        type:type,
                        url:url,
                        data:variables,
                        cache:false,
                        /**
                         * Display result
                         * @param a
                         */
                        complete:function(a) {

                            var timeEnd = new Date().getTime();
                            
                            $('#loader').hide();
                            $($form).webservices('disableForm', false);

                            $('#debug').html('<div class="well">Time : ' + (timeEnd - timeStart)/1000 + ' secondes </div>');

                            var header ='<div class="alert alert-block">' +
                                    '<h4>Header</h4>' +
                                    'Size : '+xhr.getResponseHeader('Content-Length') + ' bytes<br/>'+
                                    'Type : '+xhr.getResponseHeader('Content-Type') + '<br/>'+
                                    'Powered by : '+xhr.getResponseHeader('X-Powered-By') + '<br/>'+
                                    '</div>';

                            $('#debug').append(header);
                            
                            var info ='<div class="alert alert-info">' +
                                    '<h4>Request</h4>' +
                                    'Method : ' + $form.attr('method') +'<br/>';

                            if(useProxy)
                            {
                                info+='Proxy : ' + url + '<br/>';
                                info+='Url : ' + $form.attr('action');
                            }else{
                                info+='<p>Url : ' + url + '</p>';
                            }
                            
                            info+='</div>';
                            $('#debug').append(info);

                            try {
                                JSON.parse(a.responseText); // json validation
                                $('#debug').append('<div class="alert alert-success"><h4>JSON</h4>format valid</div>');
                            } catch(e) {
                                $('#debug').append('<div class="alert alert-error"><h4>JSON</h4>format not valid!</div>');
                            }

                            $('#debug').append('<h4>ResponseText</h4><pre>' + a.responseText + '</pre>');

                        }
                    });
                    return false;
                });

            });
        },
        /**
         * Disable forms during request
         * @param disabled
         */
        disableForm:function (disabled) {
            var $form = this;
            if (disabled) {
                $form.find('img').show();
            } else {
                $form.find('img').hide();
            }
            $('form').each(function() {
                $(this).find('label').each(function() {
                    if (disabled) {
                        $(this).addClass('disable');
                    } else {
                        $(this).removeClass('disable');
                    }
                });
                $(this).find('input').each(function() {
                    if (disabled) {
                        $(this).attr('disabled', 'disabled');
                    } else {
                        $(this).removeAttr('disabled');
                    }
                });
            });
        }
    };

    $.fn.webservices = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.webservices');
        }
    };

})( jQuery );