$(() => {
	$.get('/home/GetPeople', function (people) {
		RefreshTable(people);
	});

	$("#submit").click(() => {
		$.post('/home/AddPerson', { FirstName: $("#mdl-fn").val(), LastName: $("#mdl-ln").val(), Age: $("#mdl-age").val() }, function (people) {
			RefreshTable(people);
		});
	});

	$("#edit").click(() => {
		$.post('/home/EditPerson', { Id: $("#mdl-id").val(), FirstName: $("#mdl-fn").val(), LastName: $("#mdl-ln").val(), Age: $("#mdl-age").val() }, function (people) {
			RefreshTable(people);
		});
	});

	$("#addperson").click(() => {
		$("#mdl-fn").val(``);
		$("#mdl-ln").val(``);
		$("#mdl-age").val(``);
		//$(".submit").val(`Submit`);
		$("#personmng").modal();
	});

	$("#editperson").click(() => {
		
		const id = $(this).data('personid');
		const firstName = $(this).data('fn');
		const lastName = $(this).data('ln');
		const age = $(this).data('age');

		$("#mdl-id").val(id);
		$("#mdl-fn").val(firstName);
		$("#mdl-ln").val(lastName);
		$("#mdl-age").val(age);

		$(".submit").val(`Edit`);
		$("#submit-form").attr("data-action", "edit");
		$("#personmng").modal();
	});

	//function GetModalPerson() {
	//   const Person = {
	//		Id = $("#mdl-id").val(), 
	//		FirstName = $("#mdl-fn").val(),
	//		LastName = $("#mdl-ln").val(),
	//		Age = $("#mdl-age").val(),
	//	}
	//	return Person
	//}


	const RefreshTable = people => {
		$(".tbltd").remove();
		people.forEach(AddPersonToTable);
	}
	const AddPersonToTable = Person => {
		$("#people-tbl").append(`<tr class="tbltd">
                                        <td>${Person.FirstName}</td>
                                        <td>${Person.LastName}</td>
                                        <td>${Person.Age}</td>
										<td>
										<button class="btn btn-danger" data-id="${Person.Id}">Delete</button>
										<button class="btn btn-primary" id="editperson" data-personid="${Person.Id}" data-fn="${Person.FirstName}" data-ln="${Person.LastName}" data-age="${Person.Age}">Edit</button>
										</td>
                                 </tr>`);
	}
});