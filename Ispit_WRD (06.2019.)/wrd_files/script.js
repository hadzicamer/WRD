$("document").ready(function () {

    $("#forma").validate({

        rules: {
            dostavaIme: {
                regex: /[A-Za-z]$/,
            },
            dostavaAdresa: {
                regex: /[A-Za-z]$/,
            },
            dostavaPostanskiBroj: {
                regex: /\d{5}/
            },
            dostavaTelefon: {
                regex: /[+]\d{3}[-]\d{2}[-]\d{3}[-]\d{4}/
            }

        },

        messages: {
            dostavaIme: "Provjerite vas input!",
            dostavaAdresa: "Provjerite input!",
            dostavaPostanskiBroj: "Unijeti 5 cifara",
            dostavaTelefon: "Unijeti u formatu +111-11-111-1111",
        },
    });

    $("#a1").click(function () {
        $("#a1").css("border", "5px solid yellow");
    });

    $("#a2").click(function () {
        $("#a2").css("border", "5px solid yellow");
    });

    $("#a3").click(function () {
        $("#a3").css("border", "5px solid yellow");
    });

    function loadaj() {

        $.ajax({
            url: 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll',
            success: function (rez) {
                for (var i = 0; i < rez.length; i++) {
                    var datum = new Date(rez[i].datumNarudzbe).toISOString().slice(0,10);
                    $("tbody").append('<tr><td>' + rez[i].narudzbaId + '</td><td>' +datum+ '</td><td id="dostavaIme">' + rez[i].dostavaIme + '</td><td>' +
                        rez[i].dostavaAdresa + '</td><td>' + rez[i].dostavaPostanskiBroj + '</td><td>' + rez[i].dostavaTelefon + '</td><td>' + rez[i].napomena + '</td></tr>')
                }
            }
        });
    }
    $("#dodaj").on('click', function () {

        var podaci = {
            dostavaIme: $('#dostavaIme').val(),
            dostavaAdresa: $('#dostavaAdresa').val(),
            dostavaPostanskiBroj: $('#dostavaPostanskiBroj').val(),
            dostavaTelefon: $('#dostavaTelefon').val(),
            napomena: $('#napomena').val(),
        }
        $.ajax({
            url: 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(podaci),
            success: function () {
                loadaj();
                $("#forma")[0].reset();
            }
        });
    });
});

