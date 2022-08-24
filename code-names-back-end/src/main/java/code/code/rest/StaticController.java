package code.code.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StaticController {
    @RequestMapping(value={"/game/*" })
    public String homePage() {
        return "/index.html";
    }
}
