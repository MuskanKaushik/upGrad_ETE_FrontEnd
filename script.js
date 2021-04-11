function f() {
    var err = 0;
    var country = document.getElementById("country").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    if(country=="" || startDate=="" || endDate ==""){
        alert("All the feilds are required to fill");
        err = 1;
    }

    var xhttp1 = new XMLHttpRequest();
    var url = "https://api.covid19api.com/country/" + country + "?from=" + startDate + "T00:00:00Z&to=" + endDate + "T00:00:00Z";

    xhttp1.open("GET", url, true);
    xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var list = JSON.parse(this.responseText);
            var caseCount = 0;
            var deathCount = 0;
            var activeCount = 0;
            for (var i = 0; i < list.length; i++) {
                caseCount = caseCount + list[i].Confirmed;
                activeCount = activeCount + list[i].Active;
                deathCount = deathCount + list[i].Deaths;
            }
            create(caseCount ,activeCount ,deathCount);

        }
    };
    xhttp1.send();
}

function create(count_case, count_active, count_death) {
    var par = document.getElementById("divB");
    var dparent = document.createElement("div");
    var ccase = document.createElement("p");
   
    var c_text = document.createTextNode("Confirmed cases:");
    ccase.appendChild(c_text);

    var sc_case = document.createElement("span");
    var sc_text = document.createTextNode(count_case);

    sc_case.appendChild(sc_text);
    ccase.appendChild(sc_case);

    dparent.appendChild(ccase);

    var acase = document.createElement("p");
    var a_text = document.createTextNode("Active cases:");
    acase.appendChild(a_text);

    var sa_case = document.createElement("span");
    var sa_text = document.createTextNode(count_active);

    sa_case.appendChild(sa_text);
    acase.appendChild(sa_case);

    dparent.appendChild(acase);



    var dcase = document.createElement("p");
    var d_text = document.createTextNode("Death cases:");
    dcase.appendChild(d_text);

    var sd_case = document.createElement("span");
    var sd_text = document.createTextNode(count_death);

    sd_case.appendChild(sd_text);
    dcase.appendChild(sd_case);

    dparent.appendChild(dcase);


    dparent.setAttribute("class", "div_b");
    par.appendChild(dparent);
}