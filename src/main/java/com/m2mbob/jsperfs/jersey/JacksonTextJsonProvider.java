package com.m2mbob.jsperfs.jersey;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;

import javax.ws.rs.ConstrainedTo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.RuntimeType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;

@Provider
@ConstrainedTo(RuntimeType.CLIENT)
@Consumes(MediaType.TEXT_PLAIN) // NOTE: required to support "non-standard" JSON
// variants
@Produces(MediaType.TEXT_PLAIN)
public class JacksonTextJsonProvider extends JacksonJsonProvider {

    /*
     * (non-Javadoc)
     *
     * @see com.fasterxml.jackson.jaxrs.base.ProviderBase#
     * hasMatchingMediaTypeForReading(javax.ws.rs.core.MediaType)
     */
    @Override
    protected boolean hasMatchingMediaType(MediaType mediaType) {
        if (mediaType != null) {
            // Ok: there are also "xxx+json" subtypes, which count as well
            String subtype = mediaType.getSubtype();

            // [Issue#14]: also allow 'text/plain'
            return MediaType.TEXT_PLAIN_TYPE.getSubtype().equalsIgnoreCase(subtype)
                    || super.hasMatchingMediaType(mediaType);
        }
        return true;
    }

}
