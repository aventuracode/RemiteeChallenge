namespace WebApi.Errors
{
    public class CodeErrorResponse
    {
        public CodeErrorResponse(int statusCode, string message= null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessagesStatusCode(statusCode);

        }
        private string GetDefaultMessagesStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "El request enviado tiene errores",
                401 => "No tienes autorizacion para este recurso",
                404 => "El recurso no se encontro el item buscado",
                500 => "Se producieron errores en el servidor",
                _ => null
            };
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }

    }
}
