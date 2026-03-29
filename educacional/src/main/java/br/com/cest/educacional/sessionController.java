package br.com.cest.educacional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class sessionController {

    // Rota para Material Didático
    @GetMapping("/didatico")
    public String didatico() {
        return "didatico";
    }

    @GetMapping("/projetos")
    public String projetos() {
        return "projetoslab";
    }

    @GetMapping("/responsaveis")
    public String responsaveis() {
        return "responsaveis";
    }

    @GetMapping("/objetivos")
    public String objetivos() {
        return "obj";
    }

    @GetMapping("/vaulas")
    public String vaulas() {
        return "materiais/d_videoaula";
    }
}
