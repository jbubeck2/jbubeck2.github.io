var ajaxCall = (url, requestData) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify(requestData),
      crossDomain: true,
      headers: {"Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
                "Content-Type": "application/json"
      },
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};


const url = "https://gptsac-interested-meerkat-po.cfapps.eu10-004.hana.ondemand.com/send-prompt";

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(prompt) {
      const requestData = {
        prompt: prompt,
      };

      try {
        const { response } = await ajaxCall(
          `https://gptsac-interested-meerkat-po.cfapps.eu10-004.hana.ondemand.com/send-prompt`,
          requestData
        );
        //console.log(response.choices[0].text);
        return response.choices[0].text;
      } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
        throw error;
      }
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
