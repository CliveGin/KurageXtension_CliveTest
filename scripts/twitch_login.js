const headers = {
  Authorization:
    "Basic cHVibGljOkYvLDtgNTM4XzXCo3ZfQ1YuS1N2Nk1RWDwpcDFPQlg1Zw==",
};

/* Login Control */

var user_data; //Contiene toda la data cargada

$(window).on("load", async function () {
  onLoad_functions.forEach(f => f()); 
  // Ejecuta todas las funciones Post Carga
  // Para añadir funciones onLoad_functions.push(funcion);
});

/* Login Functions */
const ka_login = () => {
  $(this).attr("disabled", "disabled");
  chrome.runtime.sendMessage({ message: "login" }, function (response) {});
};

const ka_loadID = async () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["user_uid"], (item) => {
      let user_uid = item.user_uid;
      $.ajax({
        url: `https://api.lasercatgames.com/api/kurage/uid/${user_uid}`,
        type: "GET",
        dataType: "json",
        headers: headers,
        success: function (response) {
          resolve(response);
        },
        error: function (xhr, status, error) {
          //setError(true, "Error occurred: " + error);
          resolve({ error: "Error occurred: " + error });
        },
      });
    });
  });
};

const ka_onloadID = () => {
  chrome.storage.sync.get(["user_uid"], function (result) {
    console.log("Elemento cargado:", result.key);
  });
};

const ka_ini = async () => {
  $("#login").on("click", ka_login);

  //Intentamos hacer login automatico y cargar lso datos
  user_data = await ka_loadID();
  console.log(user_data);

  $(".login-bar").show();
  $(".loarder-container").hide();
  $(".kurage-moon").css("display","block");

  if (user_data.error) {
    //Si no es posible logear...
    $(".login-succeed").hide();

    $("#user-skin").attr("src", "media/logo.png");
  } else if (user_data.name !== undefined) {
    //Logeo correcto
    //Data importante de
    // $(".login-bar")
    $("main").addClass("logged");
    $(".login-fail").hide();
    $("#user-name").text(user_data.name);
    let coins_ =
      user_data.honor >= 100000
        ? Math.floor(user_data.honor / 1000) + " K"
        : user_data.honor;
    $("#user-coins").text(coins_);
    $("#user-skin").attr("src", user_data.skin.image);
    $(".kurage-moon").attr("href", "/perfil.html");
  }
}


const onLoad_functions = [ka_ini];