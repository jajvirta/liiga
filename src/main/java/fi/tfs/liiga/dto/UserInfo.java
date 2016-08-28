package fi.tfs.liiga.dto;

public class UserInfo {
    
    public final boolean authenticated;
    public final boolean superuser;
    public final String name;

    public UserInfo(boolean authenticated, boolean superuser, String name) {
        super();
        this.authenticated = authenticated;
        this.superuser = superuser;
        this.name = name;
    }
    

}
