package fi.tfs.liiga;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.GsonHttpMessageConverter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@SpringBootApplication

public class LiigaApplication {

    public static void main(String[] args) {

        ApplicationContext ctx = SpringApplication.run(LiigaApplication.class, args);
    }

    @Bean
    @ConditionalOnMissingBean
    public GsonHttpMessageConverter gsonHttpMessageConverter(Gson defaultGson) {
        GsonHttpMessageConverter converter = new GsonHttpMessageConverter();

        converter.setGson(new GsonBuilder().create());
        return converter;
    }
}
