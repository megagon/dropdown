1. Component rerenders with parent, PC rerenders only if props changes.

PC can break my app if I change state in parent and expect all childs to be rerendered
Also PC is not going to check deep into props, so if we have deep structure it won't notice changes deep inside object

2. 
first of all ShouldComponentUpdate should not be used nowdays at all.
not sure what can go wrong though, but I think it's something related to lifecycle - probably context will be wrong in ShouldComponentUpdate

3.

props, context, some sort of external state management - I prefer redux

props is the worst for passing to parent, but still it's possible


4.


