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
    var parent = document.getElementById("divB");
    var dparent = document.createElement("div");
    var c_case = document.createElement("p");
   
    var c_text = document.createTextNode("Confirmed cases:");
    c_case.appendChild(c_text);

    var s_c_case = document.createElement("span");
    var s_c_c_text = document.createTextNode(count_case);

    s_c_case.appendChild(s_c_c_text);
    c_case.appendChild(s_c_case);

    dparent.appendChild(c_case);

    var a_case = document.createElement("p");
    var a_text = document.createTextNode("Active cases:");
    a_case.appendChild(a_text);

    var s_a_case = document.createElement("span");
    var s_a_text = document.createTextNode(count_active);

    s_a_case.appendChild(s_a_text);
    a_case.appendChild(s_a_case);

    dparent.appendChild(a_case);



    var d_case = document.createElement("p");
    var d_text = document.createTextNode("Death cases:");
    d_case.appendChild(d_text);

    var s_d_case = document.createElement("span");
    var s_d_text = document.createTextNode(count_death);

    s_d_case.appendChild(s_d_text);
    d_case.appendChild(s_d_case);

    dparent.appendChild(d_case);


    dparent.setAttribute("class", "div_b");
    parent.appendChild(dparent);
}