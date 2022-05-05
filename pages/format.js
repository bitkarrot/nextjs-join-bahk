
export default function format(obj) { 
    let fcontent = "<ul>";
    for (var key in obj) {
      var value  = obj[key];
      console.log(key, value);
      fcontent = fcontent + "<li><b>" + key + "</b>: " +   value + "</li> ";
    }
    fcontent = fcontent +  "</ul>";
    return fcontent;
}