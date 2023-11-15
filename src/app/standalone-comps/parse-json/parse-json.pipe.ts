import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/store/user.service';
import { parseJSON } from 'src/app/utils';

@Pipe({
  name: 'parseJson',
  standalone: true,
})
export class ParseJsonPipe implements PipeTransform {
  constructor(private user: UserService) {}
  transform(value: string, ...args: unknown[]): unknown {
    return parseJSON(value, this.user.stats.dynamic_key);
  }
}
