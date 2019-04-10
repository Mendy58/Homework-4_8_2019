$(() => {
	RefreshTable();

	$("#submit").click(() => {
		if ($("#submit").text() === "submit") {
			$.post('/home/AddPerson', { FirstName: $("#mdl-fn").val(), LastName: $("#mdl-ln").val(), Age: $("#mdl-age").val() }, function () {
				RefreshTable();
			});
		}
		else if ($("#submit").text() === "Edit") {
			//$("#edit").click(() => {
			$.post('/home/EditPerson', { id: $("#mdl-id").val(), FirstName: $("#mdl-fn").val(), LastName: $("#mdl-ln").val(), Age: $("#mdl-age").val()}, function () {
					RefreshTable();
				});
			//});
		}
		$("#personmng").modal('hide');
	});

	$("#addperson").click(() => {
		$("#mdl-fn").val(``);
		$("#mdl-ln").val(``);
		$("#mdl-age").val(``);
		$("#submit").text('submit');
		$("#submit").attr('class', 'btn btn-primary');
		$("#personmng").modal();
	});

	//$("#editperson").click(() => {
		
	//	const id = $(this).data('personid');
	//	const firstName = $(this).data('fn');
	//	const lastName = $(this).data('ln');
	//	const age = $(this).data('age');

	//	$("#mdl-id").val(id);
	//	$("#mdl-fn").val(firstName);
	//	$("#mdl-ln").val(lastName);
	//	$("#mdl-age").val(age);

	//	$("#submit").val(`Edit`);
	//	$("#submit").attr('class', 'btn btn-success');
	//	$("#submit-form").attr("data-action", "edit");
	//	$("#personmng").modal();
	//});

	//function GetModalPerson() {
	//   const Person = {
	//		Id: $("#mdl-id").val(), 
	//		FirstName: $("#mdl-fn").val(),
	//		LastName: $("#mdl-ln").val(),
	//		Age = $("#mdl-age").val(),
	//	}
	//	return Person
	//}

	function GetModalPerson() {
       const Person = {
            Id: $("#mdl-id").val(), 
            FirstName: $("#mdl-fn").val(),
            LastName: $("#mdl-ln").val(),
            Age: $("#mdl-age").val(),
        }
        return Person
    }

	function RefreshTable() {
		$.get('/home/GetPeople', function (people) {
			$(".tbltd").remove();
			people.forEach(AddPersonToTable);
		});
	}

	//const RefreshTable = people => {
	//	$(".tbltd").remove();
	//	people.forEach(AddPersonToTable);
	//}
	const AddPersonToTable = Person => {
		$("#people-tbl").append(`<tr class="tbltd">
                                        <td>${Person.FirstName}</td>
                                        <td>${Person.LastName}</td>
                                        <td>${Person.Age}</td>
										<td>
										<button class="btn btn-danger delete" data-id="${Person.Id}">Delete</button>
										<button class="btn btn-primary editperson" data-id="${Person.Id}" data-fn="${Person.FirstName}" data-ln="${Person.LastName}" data-age="${Person.Age}">Edit</button>
										</td>
                                 </tr>`);
	}
	$("#people-tbl").on('click', '.delete', function () {
		$.post('/home/DeletePerson', { id: $(this).data('id') }, function () {
			RefreshTable();
		});
	});
	$("#people-tbl").on('click', '.editperson', function () {

		const id = $(this).data('id');
		const firstName = $(this).data('fn');
		const lastName = $(this).data('ln');
		const age = $(this).data('age');

		$("#mdl-id").val(id);
		$("#mdl-fn").val(firstName);
		$("#mdl-ln").val(lastName);
		$("#mdl-age").val(age);

		$("#submit").text('Edit');
		$("#submit").attr('class', 'btn btn-success');
		$("#submit-form").attr("data-action", "edit");
		$("#personmng").modal();
	});
});