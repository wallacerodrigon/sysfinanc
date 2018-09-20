package br.net.walltec.api.tokens;


import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

import br.net.walltec.api.utilitarios.Constantes;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class TokenManager {
	

	public String gerarToken(Integer idUsuario){
		
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;
		//5 minutos
		byte[] apiSecretBytes = codificarBase64(Constantes.FRASE_SECRETA);

		byte[] loginCriptografado = codificarBase64(idUsuario.toString());
		Integer qtdBytesMudar = Double.valueOf(Math.random() * Constantes.FRASE_SECRETA.length()).intValue();

		JwtBuilder builder = Jwts.builder()
						.setIssuedAt(new Date())
						.setSubject(new String(loginCriptografado))
						.setId(qtdBytesMudar.toString())
						.setExpiration(new Date(System.currentTimeMillis() + Constantes.INTERVALO_TOKEN))
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
			Claims claims = getClaims(token);
			if ( claims.getExpiration().before(new Date()) ){
				return false;
			}
			//verificar se o usuário é válido e demais validações...
			return true;
		} catch(Exception e){		
			System.out.println("Token inv�lido");
			return false;
		}
	}
	
	
	public String getSubject(String token){
		try {
			Claims claims = getClaims(token);
			String subjectDescriptografado = new String(decodificarBase64(claims.getSubject()) );

			return subjectDescriptografado;
		} catch(ExpiredJwtException e){		
			return null;
		}
	}

	/**
	 * @param token
	 * @return
	 */
	private Claims getClaims(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(codificarBase64(Constantes.FRASE_SECRETA))
				.parseClaimsJws(token).getBody();
		return claims;
	}
	
	public int getTamanhoTokenParaHash(String token) {
		Claims claims = getClaims(token);
		String id = claims.getId();
		if (id == null) {
			return 0;
		}
		return new Integer(id);
	}
	
	
	/**
	 * @param texto
	 * @return
	 */
	private byte[] decodificarBase64(String texto) {
		return Base64.getDecoder().decode(texto.getBytes());
	}

	public String gerarHash(String token) throws IllegalArgumentException  {
		if (token == null) {
			return null;
		}
		try {
			int qtdBytesMudar = this.getTamanhoTokenParaHash(token);
		    MessageDigest m = MessageDigest.getInstance("SHA-256");
		    m.update(token.getBytes(), 0, qtdBytesMudar);
		    byte[] digest = m.digest();
		    return new BigInteger(1,digest).toString(16);
		} catch (NoSuchAlgorithmException e) {
		    e.printStackTrace();
		    throw new IllegalArgumentException(e);
		}
	}
/*
 * 	String senhaAdmin = "admin";
    
    MessageDigest algorithm = MessageDigest.getInstance("SHA-256");
    byte messageDigestSenhaAdmin[] = algorithm.digest(senhaAdmin.getBytes("UTF-8"));
      
    StringBuilder hexStringSenhaAdmin = new StringBuilder();
    for (byte b : messageDigestSenhaAdmin) {
             hexStringSenhaAdmin.append(String.format("%02X", 0xFF & b));
    }
    String senhahexAdmin = hexStringSenhaAdmin.toString();
 * 
 * */
	
}
