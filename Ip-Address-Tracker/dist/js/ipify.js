class Ipify{
    constructor(){
        this.appid= 'at_j5yk4H4gu1BLTrNrMK9niCP94GRI0';

    }

    async getIpDetails(ip){
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${this.appid}&ipAddress=${ip}`);
        const data = response.json();
        return data;
    }
    async getDomainDetails(domain){
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${this.appid}&domain=${domain}`)
        const data = response.json();
        return data;
    }

}