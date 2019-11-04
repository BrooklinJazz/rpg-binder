export default class CampaignFacade {
    public findCampaigns = (userId: string) => {
        CampaignRepo.findByUser(userId)
    }
} 