var login = new Vue({
	el: "#login-form",
	data: {
		successMessage: "",
		errorMessage: "",
		logDetails: {username: "", password: ""},
	},
	methods: {
		login: function () {
			var logForm = login.toFormData(login.logDetails);
			axios.post("login/login.php", logForm)
				.then(function (response) {
					if (response.data.error) {
						login.clearMessage();
						if (sign_up !== undefined) {
							sign_up.clearMessage();
						}
						login.errorMessage = response.data.message;
					} else {
						login.clearMessage();
						if (sign_up !== undefined) {
							sign_up.clearMessage();
						}
						login.successMessage = response.data.message;
						login.logDetails = {username: "", password: ""};
						setTimeout(function () {
							window.location.href = base_url + "app/controllers/home/index.php";
						}, 1000);
					}
				});
		},
		toFormData: function (obj) {
			var form_data = new FormData();
			for (var key in obj) {
				form_data.append(key, obj[key]);
			}
			return form_data;
		},
		clearMessage: function () {
			login.errorMessage = "";
			login.successMessage = "";
		}
	}
});