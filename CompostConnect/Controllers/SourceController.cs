using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.OData;
using Microsoft.WindowsAzure.Mobile.Service;
using CompostConnect.DataObjects;
using CompostConnect.Models;

namespace CompostConnect.Controllers
{
    public class SourceController : TableController<Source>
    {
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            MobileServiceContext context = new MobileServiceContext();
            DomainManager = new EntityDomainManager<Source>(context, Request, Services);
        }

        // GET tables/Source
        public IQueryable<Source> GetAllSource()
        {
            return Query(); 
        }

        // GET tables/Source/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public SingleResult<Source> GetSource(string id)
        {
            return Lookup(id);
        }

        // PATCH tables/Source/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task<Source> PatchSource(string id, Delta<Source> patch)
        {
             return UpdateAsync(id, patch);
        }

        // POST tables/Source
        public async Task<IHttpActionResult> PostSource(Source item)
        {
            Source current = await InsertAsync(item);
            return CreatedAtRoute("Tables", new { id = current.Id }, current);
        }

        // DELETE tables/Source/48D68C86-6EA6-4C25-AA33-223FC9A27959
        public Task DeleteSource(string id)
        {
             return DeleteAsync(id);
        }

    }
}