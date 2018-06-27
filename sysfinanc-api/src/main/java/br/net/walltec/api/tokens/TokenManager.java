package br.net.walltec.api.tokens;


import br.net.walltec.api.utilitarios.Constantes;
import io.jsonwebtoken.*;

import java.util.Base64;
import java.util.Calendar;
import java.util.Date;

public class TokenManager {
	

	public String gerarToken(Integer idUsuario){
		
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
		//5 minutos
		Calendar novaDataHora = Calendar.getInstance();
		novaDataHora.set(Calendar.MINUTE, novaDataHora.get(Calendar.MINUTE) + Constantes.INTERVALO_TOKEN);
	
		byte[] apiSecretBytes = codificarBase64(Constantes.FRASE_SECRETA);

		byte[] loginCriptografado = codificarBase64(idUsuario.toString());
		
		JwtBuilder builder = Jwts.builder()
						.setIssuedAt(new Date())
						.setSubject(new String(loginCriptografado))
						.setExpiration(novaDataHora.getTime())
						.signWith(signatureAlgorithm, apiSecretBytes);
		
		return builder.compact();
	}

	/**
	 * @param texto
	 * @return
	 */
	private byte[] codificarBase64(String texto) {
		return Base64.getEncoder().encode(texto.getBytes());
	}
	
	public Boolean isTokenValido(String token){
		try {
			Claims claims = Jwts.parser()
					.setSigningKey(codificarBase64(Constantes.FRASE_SECRETA))
					.parseClaimsJws(token).getBody();
			if ( claims.getExpiration().before(new Date()) ){
				return false;
			}
			return true;
		} catch(ExpiredJwtException e){		
			System.out.println("Token inv�lido");
			return false;
		}
	}
	
	
	public String getSubject(String token){
		try {
			Claims claims = Jwts.parser()
					.setSigningKey(codificarBase64(Constantes.FRASE_SECRETA))
					.parseClaimsJws(token).getBody();
			String subjectDescriptografado = new String(decodificarBase64(claims.getSubject()) );

			return subjectDescriptografado;
		} catch(ExpiredJwtException e){		
			return null;
		}
	}
	
	
	/**
	 * @param texto
	 * @return
	 */
	private byte[] decodificarBase64(String texto) {
		return Base64.getDecoder().decode(texto.getBytes());
	}


}
