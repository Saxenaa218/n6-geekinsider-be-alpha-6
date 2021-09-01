import { Service, Inject } from 'typedi';
import { ICandidate } from './../interfaces/ICandidate';
import { IAbout } from './../interfaces/IAbout';

@Service()
export default class CandidateService {
  constructor(
    @Inject('candidateModel') private candidateModel: Models.CandidateModel,
    @Inject('aboutModel') private aboutModel: Models.AboutModel,
  ){
  }
    
  public async SetCandidate(token, req ): Promise<{ candidateRecord: ICandidate }> {
    try{
      console.log("Submitting the About Section For the Candidate");

      const aboutRecord = await this.aboutModel.create({
        about: req.body.about
      });

      console.log("Submitting the Candidate Details");
      var skills = req.body.skills.split(",")
      
      // sanity check for data skill count has to be applied each skill not greater then 100 char and array size not greater then 50.
      // sanity check for user whatsapp Number , jobtitle not more the 100 char, about not more then 1000 characters 
      // as it is both good for the recruiter to read and the candidate to describe in the reading aspect for the profile
      const candidateRecord = await this.candidateModel.create({
        _id: token.sub,  // cognitoUsername will be used as the id parameter for the user table.
        name: req.body.name,
        whatsappNumber: req.body.whatsappNumber,
        jobTitle:req.body.jobtitle,
        location: req.body.location,
        skills:skills,
        githubUrl: req.body.githubUrl,
        ctc:req.body.ctc,
        exp:req.body.exp,
        aboutid: aboutRecord['_id']
      });
      console.log(candidateRecord);
      // Need to update the data in the user model also need to remove console logs once upadted the method properly
      return { candidateRecord }  
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async GetCandidate(token): Promise<{ candidateRecord: ICandidate , aboutRecord: IAbout }> {
    try{
      console.log("Submitting the Candidate Details");

      // sanity check for data skill count has to be applied each skill not greater then 100 char and array size not greater then 50.
      // sanity check for user whatsapp Number , jobtitle not more the 100 char, about not more then 1000 characters 
      // as it is both good for the recruiter to read and the candidate to describe in the reading aspect for the profile
      const candidateRecord = await this.candidateModel.findById(token.sub);
      console.log(candidateRecord);

      const aboutRecord = await this.aboutModel.findById(candidateRecord['_id']);

      // Need to update the data in the user model also need to remove console logs once upadted the method properly
      return { candidateRecord , aboutRecord }  
    }
    catch (e) {
      throw e;
    }
  }

  
}
