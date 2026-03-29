package br.com.cest.educacional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class loginController {
    @Autowired
    private FirebaseConfig firebaseConfig;
    @GetMapping("/login")
    public String login(Model model){
        model.addAttribute("firebase",firebaseConfig);
        return "login";
    }

    @GetMapping("/")
    public String home(Model model){
        model.addAttribute("firebase",firebaseConfig);
        return "home";
    }

    @GetMapping("/apostilas")
    public String apostilas(Model model) {
        model.addAttribute("firebase", firebaseConfig); // firebaseConfig deve estar @Autowired aqui também
        return "materiais/d_apostila";
    }
}
