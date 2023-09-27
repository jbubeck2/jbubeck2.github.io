var ajaxCall = (url, requestData) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify(requestData),
      crossDomain: true,
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

const baseUrl = "https://gptsac-interested-meerkat-po.cfapps.eu10-004.hana.ondemand.com";

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(endpoint, prompt) {
      const requestData = {
        prompt: prompt,
      };

      try {
        const { response } = await ajaxCall(
          `${baseUrl}/${endpoint}`,
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
