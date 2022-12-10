import java.util.logging.Logger;

class Drak() {
	 //---------------------------------------------- FUNCTION
	 public static void startFunc(String value)
	 {
		Logger logger = Logger.getLogger("org.bonitasoft");
		def texto = " - [ START FUNCTION ( "+value.toUpperCase()+" ) ]"
		def newtext = texto.padLeft(90,'!')
		logger.info(newtext);
	 }

	 public static void stopFunc(String value)
	 {
        Logger logger = Logger.getLogger("org.bonitasoft");
        def texto = " - [ END FUNCTION ( "+value.toUpperCase()+" ) ]"
        def newtext = texto.padLeft(90,'!')
        logger.info(newtext);
		logger.info("#");
		logger.info("#");
	 }
	 //---------------------------------------------- INFO
    public static void info(String mes, def value)
    {
        Logger logger = Logger.getLogger("org.bonitasoft");
        def texto = "( [ "+mes.toUpperCase()+" ] => "
        def suffx = "[ "+value+" ] "
        def newText = texto.padLeft(60,'-')+suffx.padRight(30,'-')+' )'
        logger.info(newText);
    }
//---------------------------------------------- SECTION
    public static void section(String value)
    {
        Logger logger = Logger.getLogger("org.bonitasoft");
        def texto = "{ "+value.toUpperCase()+" }".padLeft(102,'-o')
        logger.info(texto);
    }
//---------------------------------------------- OPERATION
    public static void startOP(String value)
    {
        Logger logger = Logger.getLogger("org.bonitasoft");
        def textestart = " - [START]".padLeft(129,'%')
        def texto = " [ "+value.toUpperCase()+" ] "
        def newText = ('@'*20 + ' ' + '-' *20) + texto + ('-' *20 +' '+ '@'*20)
        logger.info(textestart);
        logger.info(newText);
    }

    public static void stopOP(String value)
    {
        Logger logger = Logger.getLogger("org.bonitasoft");
        def textestop = " - [STOP]".padLeft(129,'%')
        def texto = " [ FIN "+value.toUpperCase()+" ] "
        def newText = ('@'*20 + ' ' + '-' *20) + texto + ('-' *20 +' '+ '@'*20)
        logger.info(newText);
        logger.info(textestop);
		logger.info("#");
		logger.info("#");
    }
 }