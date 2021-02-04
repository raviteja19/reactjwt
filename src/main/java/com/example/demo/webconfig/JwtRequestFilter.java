package com.example.demo.webconfig;


import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.ExpiredJwtException;

import com.example.demo.service.JwtUserService;
import com.example.demo.util.TokenJwt;

@Component
public class JwtRequestFilter extends OncePerRequestFilter{

	@Autowired
	private JwtUserService jwtUserService;
	
	@Autowired
	private TokenJwt jwtTokenUtil;
	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {



		String username = null;
		String jwtToken = null;
		String mycookie=null;
		String requestTokenHeader=null;
		

		
		if(request.getCookies()!=null) {
		for (Cookie c : request.getCookies()) {
            if (c.getName().equals("mytoken"))
            	mycookie= c.getValue();
            }
		}
		if(mycookie==null)
		  requestTokenHeader = request.getHeader("Authorization");
		
		if(mycookie!=null)
			  requestTokenHeader = "Bearer "+mycookie;
			
			
		if ((requestTokenHeader != null && requestTokenHeader.startsWith("Bearer "))||mycookie!=null) {
			

			jwtToken = requestTokenHeader.substring(7);
			

			

			
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (Exception e) {
				System.out.println("JWT Token has expired");
			}
		} else {
			System.out.println("JWT Token does not begin with Bearer String");
		}


		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UserDetails userDetails = this.jwtUserService.loadUserByUsername(username);


			if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {

				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		chain.doFilter(request, response);
	}
	

}
