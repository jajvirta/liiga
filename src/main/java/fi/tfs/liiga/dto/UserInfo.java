package fi.tfs.liiga.dto;

public class UserInfo {
    
    public final boolean authenticated;
    public final String name;

    public UserInfo(boolean authenticated, String name) {
        super();
        this.authenticated = authenticated;
        this.name = name;
    }
    

}
