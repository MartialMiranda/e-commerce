var _datosUsuarios;

function eliminarExitoso(resultado, e, elemento) {
    $("#eliminarUsuario").modal("hide");
    if (resultado.Success) {
        $(e.currentTarget).closest('tr').remove();
        _datosUsuarios.remove(elemento);
        toastr.success("El usuario '" + elemento.nombre + 
            "' se ha eliminado satisfactoriamente");
    } else {
        toastr.error(resultado.Mensaje);
    }
}

function confirmarEliminar(e, elemento) {
    var url = "usuarios/EliminarUsuario";
    var tipo = 'POST';
    var datos = { id: elemento.id };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { eliminarExitoso(response, e, elemento); }
    , datos, tipoDatos, tipo);
}

function mostrarEliminarUsuario(e, elemento) {
    var modal = '#eliminarUsuario';
    $(modal).find(".modal-title").html('Eliminar Usuario');
    $(modal).find(".text-mensaje-modal").html('¿Está seguro que desea eliminar el usuario '
        + "'" + elemento.nombre + "'?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, elemento);
    });    
}

function editarDatos(elemento) {
    $("#txtNombre").val(elemento.nombre);
    $("#txtEmail").val(elemento.email);
    $("#txtPassword").val('');
    $("#txtDireccion").val(elemento.direccion);
    $("#txtTelefono").val(elemento.telefono);
    $("#txtImagen").val(elemento.url_imagen_usuario);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}

function eventoActualizarUsuario(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarUsuario';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Usuario : ' + "'" + 
            elemento.nombre + "'");
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            guardarUsuario(elemento.id, elemento);
        });
    });
}

function guardarUsuarioExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        $("#agregarUsuario").modal("hide");
        if (!elemento) {
            var usuario = {
                id: parseInt(respuesta.Data),
                nombre: $("#txtNombre").val(),
                email: $("#txtEmail").val(),
                direccion: $("#txtDireccion").val(),
                telefono: $("#txtTelefono").val(),
                url_imagen_usuario: $("#txtImagen").val(),
                fecha_registro: new Date().toISOString()
            };
            _datosUsuarios.push(usuario);    
        } else {
            elemento.nombre = $("#txtNombre").val();
            elemento.email = $("#txtEmail").val();
            elemento.direccion = $("#txtDireccion").val();
            elemento.telefono = $("#txtTelefono").val();
            elemento.url_imagen_usuario = $("#txtImagen").val();
        }
        mostrarDatosUsuarios();
        toastr.success("El usuario se ha guardado satisfactoriamente");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}

function guardarUsuario(id, elemento) {
    var url = "usuarios/GuardarUsuario";
    var tipo = 'POST';
    var datos = {
        id: id,
        nombre: $("#txtNombre").val(),
        email: $("#txtEmail").val(),
        password: $("#txtPassword").val(),
        direccion: $("#txtDireccion").val(),
        telefono: $("#txtTelefono").val(),
        url_imagen_usuario: $("#txtImagen").val()
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarUsuarioExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}

function limpiarDatos() {
    $("#txtNombre").val("");
    $("#txtEmail").val("");
    $("#txtPassword").val("");
    $("#txtDireccion").val("");
    $("#txtTelefono").val("");
    $("#txtImagen").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}

function mostrarModalUsuario() {    
    limpiarDatos();
    var modal = '#agregarUsuario';    
    $(modal).find(".modal-title").html("Adicionar Usuario");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}

function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString();
}

function mostrarDatosUsuarios() {
    limpiarTabla('tblUsuarios');
    $.each(_datosUsuarios, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.id);
        fila.append(col(elemento.id).addClass("alinearCentro"));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.nombre);
        eventoActualizarUsuario(input, elemento);
        fila.append(col(input));
        fila.append(col(elemento.email));
        fila.append(col(elemento.telefono || ''));
        fila.append(col(elemento.direccion || ''));
        fila.append(col(formatearFecha(elemento.fecha_registro)));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarUsuario(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblUsuarios tbody').append(fila);
    });
}

function getUsuariosExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosUsuarios = resultado.Data;
        mostrarDatosUsuarios();        
    } else {
        toastr.error(resultado.Mensaje);
    }
}

function init() {
    var url = "usuarios/obtenerUsuarios";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getUsuariosExitoso, datos, tipoDatos, tipo);
}

$(document).ready(function () {    
    init();  
    $('#btnAdicionar').click(function () { mostrarModalUsuario(); });  
    $('#btnCancelar').click(function () { $('#agregarUsuario').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarUsuario(0); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarUsuario").modal("hide"); });    
});